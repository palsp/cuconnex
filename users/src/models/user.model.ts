import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  Sequelize
} from 'sequelize';
import { Interest, InterestCreationAttrs } from './interest.model';

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
    return this.createInterest({ interest: attrs.interest });
  }

  public async createInterestsFromArray(interests: InterestCreationAttrs[]) {
    for (let interest of interests) {
      await this.createInterests(interest);
    }
  }

  public static associations: {
    interests: Association<User, Interest>;
  };
}

const initUser = (sequelize: Sequelize) =>
  User.init(
    {
      id: {
        type: DataTypes.STRING(11),
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    },
    {
      tableName: 'users',
      sequelize
    }
  );

export { User, initUser };
