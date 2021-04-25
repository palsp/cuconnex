import {
  Model,
  DataTypes,
  Sequelize,
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
} from 'sequelize';

import { TableName } from './types';

import { IsMember } from './isMember.model';
import { User } from './user.model';
import { TeamStatus, BadRequestError } from '@cuconnex/common';

import { ITeamResponse } from '../interfaces/team';
import { IUserResponse } from '../interfaces/user';

// keep member array as id of user
export interface TeamAttrs {
  name: string;
  creatorId: string;
  description: string;
  lookingForMembers: boolean;
  members?: User[];
}

export interface TeamCreationAttrs {
  name: string;
  description: string;
}

class Team extends Model<TeamAttrs, TeamCreationAttrs> {
  public name!: string;
  public creatorId!: string;
  public description!: string;
  public lookingForMembers: boolean = true;
  public members?: User[];

  public static autoMigrate(sequelize: Sequelize) {
    Team.init(
      {
        name: {
          type: DataTypes.STRING(255),
          primaryKey: true,
        },
        creatorId: {
          type: DataTypes.STRING(11),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        lookingForMembers: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        tableName: TableName.teams,
        sequelize,
        timestamps: false,
      }
    );
  }

  // this addMember function just create PENDING status not ACCEPTED -> try use the 'addAndAcceptMember' function instead
  public addMember!: BelongsToManyAddAssociationMixin<IsMember, User>;
  public getMember!: BelongsToManyGetAssociationsMixin<User>;

  // create PENDING status to the user
  public async inviteMember(user: User) {
    const member = await IsMember.findOne({ where: { teamName: this.name, userId: user.id } });

    // if there is a member status : 'accept || reject || pending ' do nothing
    if (member) {
      throw new BadRequestError(`This user already have status: ${member.status}`);
    }

    return this.addMember(user);
  }

  // edit can be use to ACCEPT or REJECT status
  public async editMemberStatus(user: User, status: TeamStatus) {
    const isMember = await IsMember.findOne({ where: { teamName: this.name, userId: user.id } });

    // no status with this user yet
    if (!isMember) {
      throw new BadRequestError(`User ${user.id} does not have any status yet`);
    }

    isMember.status = status;
    try {
      await isMember.save();
    } catch (err) {
      throw new BadRequestError(err.message);
    }
  }

  // this will promptly create ACCEPT status for user >> mostly use for the creator of the team
  public async addAndAcceptMember(user: User) {
    const isMember = await IsMember.findOne({ where: { teamName: this.name, userId: user.id } });

    if (isMember) {
      // if user already accepted in the team
      if (isMember.status === TeamStatus.Accept) {
        throw new BadRequestError(`This user is already part of the team`);

        // if user have other status, just bring him/her in the team
      } else {
        isMember.status = TeamStatus.Accept;
        await isMember.save();
      }
    }

    await this.addMember(user);
    const newIsMember = await IsMember.findOne({ where: { teamName: this.name, userId: user.id } });

    if (!newIsMember) {
      throw new Error('Db connection failed');
    }
    newIsMember.status = TeamStatus.Accept;
    await newIsMember.save();
    return;
  }

  // get accepted members
  public async getMembers(): Promise<User[]> {
    const membersWithAllStatus = await this.getMember();

    if (!membersWithAllStatus) {
      throw new BadRequestError('This team has no member');
    }

    const acceptedUsers = membersWithAllStatus.filter((member: User) => {
      if (member.isMembers!.status === TeamStatus.Accept) {
        return member;
      }
    });

    return acceptedUsers;
  }

  public toJSON(): ITeamResponse {
    const values = { ...this.get() };
    let returnMembers: IUserResponse[] = [];

    if (this.members) {
      returnMembers = this.members.map((member) => member.toJSON());
    }

    return { ...values, members: returnMembers };
  }
}

export { Team };
