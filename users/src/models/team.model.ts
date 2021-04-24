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

  public addMember!: BelongsToManyAddAssociationMixin<Member, User>;
  public getMember!: BelongsToManyGetAssociationsMixin<Member>;

  public async inviteMember(user: User) {
    const member = await Member.findOne({ where: { teamName: this.name, userId: user.id } });

    // if there is a member status : 'accept || reject || pending ' do nothing
    if (member) {
      throw new BadRequestError(`This user already have status: ${member.status}`);
    }

    return this.addMember(user);
  }

  public async editMemberStatus(user: User, status: TeamStatus) {
    const member = await Member.findOne({ where: { teamName: this.name, userId: user.id } });

    // no status from this user yet
    if (!member) {
      throw new BadRequestError('User does not have any status yet');
    }

    member.status = status;
    try {
      await member.save();
    } catch (err) {
      throw new Error('Db connection failed');
    }
  }
}

export { Team };
