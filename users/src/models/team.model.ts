import { Model, DataTypes, Sequelize, STRING } from 'sequelize';
import { TableName } from './types';

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

class Team extends Model<TeamAttrs, TeamCreationAttrs> implements TeamAttrs {
  public name!: string;
  public creatorId!: string;
  public description!: string;
  public lookingForMembers: boolean = true;

  public static autoMigrate(sequelize: Sequelize) {
    Team.init(
      {
        name: {
          type: DataTypes.STRING(255),
          primaryKey: true
        },
        creatorId: {
          type: DataTypes.STRING(11),
          allowNull: false
        },
        description: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        lookingForMembers: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        }
      },
      {
        tableName: TableName.teams,
        sequelize,
        timestamps: false
      }
    );
  }
}


export { Team };
