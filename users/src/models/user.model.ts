import {
  Model,
  DataTypes,
  Op,
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  Sequelize
} from 'sequelize';
import {
  BadRequestError,
  FriendStatus,
  InterestDescription,
  NotFoundError
} from '@cuconnex/common';
import { TableName } from './types';
import { Team, TeamCreationAttrs } from './team.model';
import { Interest, InterestCreationAttrs } from './interest.model';
import { Friend } from './friend.model';

// All attributes in user model
interface UserAttrs {
  id: string;
  email: string;
  password: string;
  name: string;
  imagePath: string;
  lookingForTeam: boolean;
  interests?: Interest[];
  friends?: User[];
}

interface UserCreationAttrs {
  id: string;
  email: string;
  password: string;
  name: string;
}
class User extends Model<UserAttrs, UserCreationAttrs> {
  public id!: string;
  public password!: string;
  public name!: string;
  public email!: string;
  public imagePath?: string;
  public lookingForTeam: boolean = true;
  public friends?: User[];
  public interests?: Interest[];

  // user add existing interest
  public addInterest!: BelongsToManyAddAssociationMixin<Interest, User>;
  public getInterests!: BelongsToManyGetAssociationsMixin<Interest>;

  public addFriend!: BelongsToManyAddAssociationMixin<User, { status: FriendStatus }>;
  public getFriend!: BelongsToManyGetAssociationsMixin<User>;

  // add interest from a given arry to user info
  public async addInterestFromArray(interests: InterestCreationAttrs[]) {
    for (let interest of interests) {
      // find correspondin interest in db
      const int = await Interest.findOne({ where: { description: interest.description } });

      // add association between user and interest
      if (int) {
        await this.addInterest(int);
      }
    }
  }

  //Method for finding a relation attached here to minimize hassle
  public async findRelation(userId: string): Promise<FriendStatus | null> {
    if (this.id === userId) return null;
    const constraint = {
      [Op.or]: [
        { senderId: this.id, receiverId: userId },
        { senderId: userId, receiverId: this.id }
      ]
    };
    const friend = await Friend.findOne({ where: constraint });
    if (!friend) {
      return FriendStatus.toBeDefined;
    }

    return friend.status;
  }

  public async addUserAsFriend(user: User) {
    const status = await this.findRelation(user.id);

    // if friend relation is established or alredy send a request
    if (status === FriendStatus.Accept || status === FriendStatus.Pending) {
      return;
    }

    return this.addFriend(user);
  }

  public static async findUser(userId: string): Promise<User> {
    const user = await User.findByPk(userId);

    // check if user who is added exists in the database
    if (!user) {
      throw new NotFoundError();
    }

    return user;
  }

  public async acceptFriendRequest(userId: string, accpeted: Boolean): Promise<FriendStatus> {
    const relation = await Friend.findOne({ where: { senderId: userId, receiverId: this.id } });

    if (!relation) {
      throw new BadRequestError('User has not send a request yet');
    }

    if (accpeted) {
      relation.status = FriendStatus.Accept;
    } else {
      relation.status = FriendStatus.Reject;
    }

    try {
      await relation.save();
    } catch (err) {
      throw new Error('Db connection failed');
    }

    return relation.status;
  }

  public createTeam!: HasManyCreateAssociationMixin<Team>;
  public getTeams!: HasManyGetAssociationsMixin<Team>;

  public createTeams(attrs: TeamCreationAttrs) {
    return this.createTeam({
      name: attrs.name,
      description: attrs.description
    });
  }

  public static associations: {
    interests: Association<Interest>;
    friend: Association<User, User>;
    teams: Association<User, Team>;
  };
}

const initUser = (sequelize: Sequelize) => {
  User.init<User>(
    {
      id: {
        type: DataTypes.STRING(11),
        primaryKey: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(12),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      imagePath: {
        type: DataTypes.STRING(255)
      },
      lookingForTeam: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      tableName: TableName.users,
      sequelize,
      timestamps: false
    }
  );

  return User;
};

export { User, initUser };
