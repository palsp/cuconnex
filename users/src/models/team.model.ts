import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  Sequelize,
  STRING
} from 'sequelize';

// keep member array as id of user
export interface TeamAttrs {
  name: string;
  userId: string;
}

export interface TeamCreationAttrs {
  name: string;
}

class Team extends Model<TeamAttrs, TeamCreationAttrs> implements TeamAttrs {
  public name!: string;
  public userId!: string;

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
      }
    },
    {
      tableName: 'teams',
      sequelize
    }
  );
  return Team;
};

export { Team, initTeam };
