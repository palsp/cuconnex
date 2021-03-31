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
import { BadRequestError, NotFoundError, FriendStatus } from '@cuconnex/common';

import { TableName } from './types';
import { Team, TeamCreationAttrs } from './team.model';
import { Interest, InterestCreationAttrs } from './interest.model';
import { Friend } from './friend.model';

// All attributes in user model
interface UserAttrs {
  id: string;
  name: string;
  // faculty: Faculty;
  faculty: string;
  image: string;
  lookingForTeam: boolean;
  interests?: Interest[];
  friends?: User[];
}

interface UserCreationAttrs {
  id: string;
  name: string;
  faculty?: string;
  image?: string;
  lookingForTeam?: boolean;
}

class User extends Model<UserAttrs, UserCreationAttrs> {
  public id!: string;
  public name!: string;

  public faculty?: string;
  public image?: string;
  public lookingForTeam: boolean = true;

  public interests?: Interest[];
  public friends?: User[];

  // user add existing interest
  public addInterest!: BelongsToManyAddAssociationMixin<Interest, User>;
  public getInterests!: BelongsToManyGetAssociationsMixin<Interest>;

  public addFriend!: BelongsToManyAddAssociationMixin<User, { status: FriendStatus }>;
  public getFriend!: BelongsToManyGetAssociationsMixin<User>;

  /**
   * Adds interest from a given Array of InterestCreationAttrs to the user who calls this method.
   * 
   * This is done via calling the `BelongsToManyAddAssociationMixin` on the `<Interest, User>` pair
   * @param {InterestCreationAttrs[]} interests - The array of interests the user is interested in.
   */
  public async addInterestFromArray(interests: InterestCreationAttrs[]) {
    for (let interest of interests) {

      // find corresponding interest in db
      const int = await Interest.findOne({ where: { description: interest.description } });

      // add association between user and interest
      if (int) {
        await this.addInterest(int);
      }
    }
  }

  //Method for finding a relation attached here to minimize hassle
  /**A method to check if the current user has a relationship with the user with specified id.
   * This is done by querying the Friend database for any ones with `senderId` equal to current user id 
   * and `receiverId` equal to the specified id or vice versa.
   * 
   * If a relationship is found, returns the friendship status between the two users
   * 
   * else, returns `FriendStatus.toBeDefined`
   * 
   * @param {string} userId - The id of the user we wish to check for a relationship with the current user id.
   * @returns {FriendStatus} friend.status - The friend status between the two users, if the relationship exists
   */
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

  /**A method for adding a user as a friend. 
   * 
   * It first checks if their exists a relation of any kind between the two users.
   * If the two users are already friends or current user have already send the friend request, it returns nothing.
   * 
   * If not, it calls the `addFriend()` method on the passed in user object.
   * 
   * @param {User} user - the user to add as a friend to the current user.
   * @returns the result of calling `this.addFriend(user)` with the specified user, if the relationship is not already established, returns **null** otherwise.
   */

  public async addUserAsFriend(user: User) {
    const status = await this.findRelation(user.id);

    // if friend relation is established or alredy send a request
    if (status === FriendStatus.Accept || status === FriendStatus.Pending) {
      return;
    }

    return this.addFriend(user);
  }

  /**
   * Method for finding a user with the specified userId.
   * Returns a promise that resolves if a user is found.
   * 
   * if the user is not found, throws a new NotFoundError
   * @param userId - The id of the user we wish to find
   * @throws {NotFoundError} - if the user is not found
   * @return {User}`user` - the found user, if it exists 
   */
  public static async findUser(userId: string): Promise<User> {
    const user = await User.findByPk(userId);

    // check if user who is added exists in the database
    if (!user) {
      throw new NotFoundError();
    }

    return user;
  }

  public async acceptFriendRequest(userId: string, accepted: Boolean): Promise<FriendStatus> {
    const relation = await Friend.findOne({ where: { senderId: userId, receiverId: this.id } });

    if (!relation) {
      throw new BadRequestError('User has not send a request yet');
    }

    if (accepted) {
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

  /**
   * Creates Team with the specified name and description
   * @param {TeamCreationAttrs} attrs - A TeamCreationAttrs object consisting of the team name and description
   * @param {string} attrs.name - The name of the team
   * @param {string} attrs.description - A description of the team
   * @returns 
   */
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
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      faculty: {
        type: DataTypes.STRING(255)
      },
      image: {
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
