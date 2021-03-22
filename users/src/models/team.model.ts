import { Model, DataTypes, Sequelize, STRING } from 'sequelize';

// keep member array as id of user
export interface TeamAttrs {
  name: string;
  userId: string;
  description: string;
}

export interface TeamCreationAttrs {
  name: string;
  description: string;
}

class Team extends Model<TeamAttrs, TeamCreationAttrs> implements TeamAttrs {
  public name!: string;
  public userId!: string;
  public description!: string;

  // public addMember(user: UserAttrs) {

  // }
}

const initTeam = (sequelize: Sequelize) => {
  Team.init(
    {
      name: {
        type: DataTypes.STRING(255),
        primaryKey: true
      },
      userId: {
        type: DataTypes.STRING(11),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(255)
      }
    },
    {
      tableName: 'teams',
      sequelize,
      timestamps: false
    }
  );
  return Team;
};

export { Team, initTeam };
