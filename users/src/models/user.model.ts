import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  Sequelize
} from 'sequelize';
import { Interest, InterestCreationAttrs } from './interest.model';
import { Team, TeamCreationAttrs } from './team.model';

// All attributes in user model
interface UserAttrs {
  id: string;
  name: string;
}

interface UserCreationAttrs {
  id: string;
  name: string;
}

class User extends Model<UserAttrs, UserCreationAttrs> implements UserAttrs {
  public id!: string;
  public name!: string;

  public createInterest!: HasManyCreateAssociationMixin<Interest>;
  public getInterests!: HasManyGetAssociationsMixin<Interest>;

  public createInterests(attrs: InterestCreationAttrs) {
    return this.createInterest({ description: attrs.description });
  }

  public async createInterestsFromArray(interests: InterestCreationAttrs[]) {
    for (let interest of interests) {
      await this.createInterests(interest);
    }
  }

  public createTeam!: HasManyCreateAssociationMixin<Team>;
  public getTeams!: HasManyGetAssociationsMixin<Team>;

  public createTeams(attrs: TeamCreationAttrs) {
    console.log('this runnnn ----', typeof attrs.userId);
    return this.createTeam({
      teamId: attrs.teamId,
      // userId: attrs.userId,
      teamName: attrs.teamName
    });
  }

  public static associations: {
    interests: Association<User, Interest>;
    teams: Association<User, Team>;
  };
}

const initUser = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.STRING(11),
        primaryKey: true
      },
      name: {
        type: new DataTypes.STRING(255),
        allowNull: false
      }
    },
    {
      tableName: 'users',
      sequelize
    }
  );

  return User;
};

export { User, initUser };
