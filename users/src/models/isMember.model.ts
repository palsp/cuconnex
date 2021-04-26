import { Model, DataTypes, Sequelize } from 'sequelize';

import { TableName } from './types';

import { TeamStatus } from '@cuconnex/common';

// keep member array as id of user
export interface IsMemberAttrs {
  teamName: string;
  userId: string;
  status: TeamStatus;
}

export interface IsMemberCreationAttrs {
  teamName: string;
  userId: string;
  status: TeamStatus;
}

class IsMember extends Model<IsMemberAttrs, IsMemberCreationAttrs> implements IsMemberAttrs {
  public teamName!: string;
  public userId!: string;
  public status!: TeamStatus;

  /**
   * Automatically migrate schema, to keep your schema up to date.
   * @param sequelize
   */
  public static autoMigrate(sequelize: Sequelize) {
    IsMember.init(
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
          allowNull: false,
        },
      },
      {
        tableName: TableName.isMembers,
        sequelize,
        timestamps: false,
      }
    );
  }
}

export { IsMember };
