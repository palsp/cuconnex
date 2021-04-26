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

import { ITeamResponse, IUserResponse, IOutgoingRequestResponse } from '../interfaces';
import { NotFoundError } from '@bkatickets/common';

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
  // public addMember!: BelongsToManyAddAssociationMixin<User, { status: TeamStatus }>;
  public getMember!: BelongsToManyGetAssociationsMixin<User>;

  // create PENDING status to the user
  public async invite(user: User) {
    let isMember = await IsMember.findOne({ where: { teamName: this.name, userId: user.id } });

    // if there is a member status : 'accept || reject || pending ' do nothing
    if (isMember) {
      throw new BadRequestError(`This user already have status: ${isMember.status}`);
    }

    await IsMember.create({
      teamName: this.name,
      userId: user.id,
      status: TeamStatus.Pending,
      sender: 'team',
    });
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

  // this will promptly create ACCEPT status for user promptly
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
      throw new BadRequestError('IsMember db went wrong');
    }
    newIsMember.status = TeamStatus.Accept;
    await newIsMember.save();

    return;
  }

  // check if member part of the team
  public async findMember(userId: string): Promise<Boolean> {
    if (userId === this.creatorId) {
      return true;
    }

    const isMember = await IsMember.findOne({ where: { teamName: this.name, userId } });
    if (isMember) {
      if (isMember.status === TeamStatus.Accept) {
        return true;
      }
    }
    return false;
  }

  public async getOutgoingRequests(): Promise<IOutgoingRequestResponse> {
    const membersWithAllStatus: User[] = await this.getMember();

    const isMembers = await IsMember.findAll({ where: { teamName: this.name, sender: 'team' } });

    if (!isMembers || isMembers.length < 1) {
      throw new BadRequestError('This team has no pending request to any user.');
    }

    if (!membersWithAllStatus || membersWithAllStatus.length < 1) {
      throw new BadRequestError('This team has no member');
    }

    let pendingUsers: IUserResponse[] = [];
    for (let i = 0; i < isMembers.length; i++) {
      let user = await User.findByPk(isMembers[i].userId);
      pendingUsers.push(user!.toJSON());
    }

    const response: IOutgoingRequestResponse = {
      teamName: this.name,
      pendingUsers,
    };

    return response;
  }

  // get accepted members
  public async getMembers(): Promise<User[]> {
    const membersWithAllStatus: User[] = await this.getMember();

    const acceptedUsers = membersWithAllStatus.filter((member: User) => {
      if (member.isMembers!.status === TeamStatus.Accept) {
        return member;
      }
    });

    const creator = await User.findByPk(this.creatorId);
    acceptedUsers.push(creator!);

    return acceptedUsers;
  }

  public async fetchTeam() {
    const members: User[] = await this.getMembers();
    this.members = members;
    // return this;
  }

  public toJSON(): ITeamResponse {
    const values = { ...this.get() };
    let returnMembers: IUserResponse[] = [];

    if (this.members) {
      returnMembers = this.members.map((member: User) => member.toJSON());
    }

    return { ...values, members: returnMembers };
  }
}

export { Team };
