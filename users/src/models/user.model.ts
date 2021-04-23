import {
  Model,
  DataTypes,
  Op,
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  Sequelize,
} from 'sequelize';
import { BadRequestError, NotFoundError, FriendStatus, Description } from '@cuconnex/common';

import { TableName } from './types';
import { Team, TeamCreationAttrs } from './team.model';
import { Interest } from './interest.model';
import { Connection } from './connection.model';

import { IUserResponse } from '../interfaces';

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
  year: string,
  major: string,
  bio: string,
  connections?: Connection;
}

interface UserCreationAttrs {
  id: string;
  name: string;
  faculty?: string;
  image?: string;
  lookingForTeam?: boolean;
  year?: string,
  major?: string,
  bio?: string,

}


class User extends Model<UserAttrs, UserCreationAttrs> {
  public id!: string;
  public name!: string;

  public faculty!: string;
  public image!: string;
  public lookingForTeam: boolean = true;
  public year!: string;
  public major!: string;
  public bio!: string;

  public interests?: Interest[];
  public connections?: Connection;





  /**
   * Automatically migrate schema, to keep your schema up to date.
   * @param {Sequelize} sequelize
   */
  public static autoMigrate(sequelize: Sequelize) {
    User.init<User>(
      {
        id: {
          type: DataTypes.STRING(10),
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        faculty: {
          type: DataTypes.STRING(255),
          defaultValue: "",
        },
        year: {
          type: DataTypes.STRING(1),
          defaultValue: "",
        },
        major: {
          type: DataTypes.STRING(255),
          defaultValue: "",
        },
        bio: {
          type: DataTypes.STRING(255),
          defaultValue: "",
        },
        image: {
          type: DataTypes.STRING(255),
          defaultValue: "",
        },
        lookingForTeam: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        tableName: TableName.users,
        sequelize,
        timestamps: false,
      }
    );
  }



  // user add existing interest
  public addInterest!: BelongsToManyAddAssociationMixin<Interest, User>;
  public getInterests!: BelongsToManyGetAssociationsMixin<Interest>;

  public addConnection!: BelongsToManyAddAssociationMixin<User, { status: FriendStatus }>;
  public getConnection!: BelongsToManyGetAssociationsMixin<User>;

  /**
   * Adds interest from a given Array of InterestCreationAttrs to the user who calls this method.
   * 
   * This is done via calling the `BelongsToManyAddAssociationMixin` on the `<Interest, User>` pair
   * @param {Description[]} interests - The array of interests the user is interested in.
   */
  public async addInterestFromArray(interests: Description[]) {
    for (let interest of interests) {
      try {
        // find corresponding interest in db
        const addedInterest = await Interest.findOne({ where: { description: interest } });

        await this.addInterest(addedInterest!);
      } catch (err) {
        console.log(err);
      }
    }
  }

  /**
   * A method to retreive user from database which include user's interest
   * @param userId 
   * @returns 
   */
  public static async fetchUser(userId: string): Promise<User | null> {
    return User.findOne({ where: { id: userId }, include: 'interests' });
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
   * @returns {FriendStatus | null} friend.status - The friend status between the two users, if the relationship exists
   */
  public async findRelation(userId: string): Promise<FriendStatus | null> {
    // TODO: parameter need to be change from string to User
    if (this.id === userId) return null;
    const constraint = {
      [Op.or]: [
        { senderId: this.id, receiverId: userId },
        { senderId: userId, receiverId: this.id },
      ],
    };
    const friend = await Connection.findOne({ where: constraint });
    if (!friend) {
      return FriendStatus.toBeDefined;
    }

    return friend.status;
  }




  /**
   * addConnection with additional logic to check whether the connection is established.
   * if not, this method will and connection to db. otherwise, it will reject the addConnection
   * @param {User} user - the user to add as a friend to the current user.
   * @returns the result of calling `this.addConnection(user)` with the specified user, if the relationship is not already established, returns **null** otherwise.
   */
  public async requestConnection(user: User) {
    const status = await this.findRelation(user.id);

    // if friend relation is established or alredy send a request
    if (status === FriendStatus.Accept || status === FriendStatus.Pending) {
      return;
    }

    return this.addConnection(user);
  }

  public async getRequestConnection(): Promise<User[]> {
    const result: User[] = [];
    const connections = await this.getConnection()
    for (let conn of connections) {
      const status = await this.findRelation(conn.id);
      if (status === FriendStatus.Pending) {
        result.push(conn);
      }
    }
    return result;

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

  /**
   * A function for accepting the friend request. It first checks if the user whose id was passed in has sent 
   * a friend request to the current user or not. If so, then it changes the friendStatus of the two according to the 
   * passed in accepted parameter. 
   * @param userId - the user who send the friend request
   * @param accepted - whether or not the current user accepts the friend request
   * @returns 
   */

  public async acceptConnection(userId: string, accepted: Boolean): Promise<FriendStatus> {
    const relation = await Connection.findOne({ where: { senderId: userId, receiverId: this.id } });

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
      description: attrs.description,
    });
  }



  public toJSON(): IUserResponse {
    const values = { ...this.get() }
    let interests: string[] = [];
    if (this.interests) {
      interests = this.interests.map(interest => interest.serializer());
    }

    if (this.connections) {
      delete this.connections
    }

    return { ...values, interests }

  }

  public static associations: {
    interests: Association<Interest>;
    friend: Association<User, User>;
    teams: Association<User, Team>;
    member: Association<User, Team>;
  };
}



export { User };
