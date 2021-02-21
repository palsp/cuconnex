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
interface TeamAttrs {
  teamId: string;
  userId: string;
  teamName: string;
}

interface TeamCreationAttrs {
  teamId: string;
  userId: string;
  teamName: string;
}

class Team extends Model<TeamAttrs, TeamCreationAttrs> implements TeamAttrs {
  teamId!: string;
  userId!: string;
  teamName!: string;
}

const initTeam = (sequelize: Sequelize) => {
  Team.init(
    {
      teamId: {
        type: DataTypes.STRING(11),
        primaryKey: true
      },
      userId: {
        type: DataTypes.STRING(11),
        allowNull: false
      },
      teamName: {
        type: DataTypes.STRING(255)
      }
    },
    {
      tableName: 'teams',
      sequelize
    }
  );
};

export { Team, initTeam };
