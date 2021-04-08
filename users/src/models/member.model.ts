import {
  Model,
  DataTypes,
  Sequelize
} from 'sequelize';

import { TableName } from './types';

import { User } from './user.model';
import { Team } from './team.model';

import { TeamStatus } from '@cuconnex/common';

// keep member array as id of user
export interface MemberAttrs {
  teamName: string;
  userId: string;
  status: TeamStatus;
}

export interface MemberCreationAttrs {
  teamName: string;
  userId: string;
  status: TeamStatus;
}

class Member extends Model<MemberAttrs, MemberCreationAttrs> implements MemberAttrs {
  public teamName!: string;
  public userId!: string;
  public status!: TeamStatus;

  /**
   * Automatically migrate schema, to keep your schema up to date.
   * @param sequelize 
   */
  public static autoMigrate(sequelize: Sequelize) {
    Member.init(
      {
        teamName: {
          type: DataTypes.STRING(255),
          primaryKey: true,
          // references: { model: Team.tableName }
        },
        userId: {
          type: DataTypes.STRING(11),
          primaryKey: true,
          // references: { model: User.tableName }
        },
        status: {
          type: DataTypes.ENUM,
          values: Object.values(TeamStatus),
          allowNull: false
        }
      },
      {
        tableName: TableName.members,
        sequelize,
        timestamps: false
      }
    );
  }
}

export { Member };
