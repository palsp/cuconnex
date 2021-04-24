import {
  Model,
  DataTypes,
  Sequelize,
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
} from 'sequelize';

import { TableName } from './types';

import { Member } from './member.model';
import { User } from './user.model';
import { TeamStatus, BadRequestError } from '@cuconnex/common';

// keep member array as id of user
export interface TeamAttrs {
  name: string;
  creatorId: string;
  description: string;
  lookingForMembers: boolean;
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
  public addMember!: BelongsToManyAddAssociationMixin<Member, User>;
  public getMember!: BelongsToManyGetAssociationsMixin<Member>;

  // create PENDING status to the user
  public async inviteMember(user: User) {
    const member = await Member.findOne({ where: { teamName: this.name, userId: user.id } });

    // if there is a member status : 'accept || reject || pending ' do nothing
    if (member) {
      throw new BadRequestError(`This user already have status: ${member.status}`);
    }

    return this.addMember(user);
  }

  // edit can be use to ACCEPT or REJECT status
  public async editMemberStatus(user: User, status: TeamStatus) {
    const member = await Member.findOne({ where: { teamName: this.name, userId: user.id } });

    // no status with this user yet
    if (!member) {
      throw new BadRequestError(`User ${user.id} does not have any status yet`);
    }

    member.status = status;
    try {
      await member.save();
    } catch (err) {
      throw new BadRequestError(err.message);
    }
  }

  // this will promptly create ACCEPT status for user >> mostly use for the creator of the team
  public async addAndAcceptMember(user: User) {
    const member = await Member.findOne({ where: { teamName: this.name, userId: user.id } });

    if (member) {
      // if user already accepted in the team
      if (member.status === TeamStatus.Accept) {
        throw new BadRequestError(`This user is already part of the team`);

        // if user have other status, just bring him/her in the team
      } else {
        member.status = TeamStatus.Accept;
        await member.save();
      }
    }

    await this.addMember(user);
    const newMember = await Member.findOne({ where: { teamName: this.name, userId: user.id } });

    if (!newMember) {
      throw new Error('Db connection failed');
    }
    newMember.status = TeamStatus.Accept;
    await newMember.save();
    return;
  }
}

export { Team };
