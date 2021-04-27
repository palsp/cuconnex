import {
  Model,
  DataTypes,
  Op,
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyAddAssociationMixin,
  Association,
  Sequelize,
  BelongsToManySetAssociationsMixin,
} from 'sequelize';
import {
  BadRequestError,
  NotFoundError,
  TeamStatus,
  FriendStatus,
  Description,
  faculty,
  getCurrentYear,
  getYearFromId,
  getFacultyCodeFromId,
  InternalServerError,
  InterestDescription,
} from '@cuconnex/common';

import { TableName } from './types';
import { Team, TeamCreationAttrs } from './team.model';
import { Interest } from './interest.model';
import { Connection } from './connection.model';
import { IsMember } from './isMember.model';
import { InterestBody, IUserResponse } from '../interfaces';

// All attributes in user model
interface UserAttrs {
  id: string;
  name: string;
  image: string;
  faculty?: string;
  year?: string;
  role: string;
  bio: string;
  lookingForTeam: boolean;
  interests?: Interest[];
  friends?: User[];
  connections?: Connection;
  isMembers?: IsMember;
}

interface UserCreationAttrs {
  id: string;
  name: string;
  image?: string;
  lookingForTeam?: boolean;
  role?: string;
  bio?: string;
}

class User extends Model<UserAttrs, UserCreationAttrs> {
  public id!: string;
  public name!: string;

  public faculty!: string;
  public image!: string;
  public lookingForTeam: boolean = true;
  public year!: string;
  public role!: string;
  public bio!: string;

  public interests?: Interest[];
  public connections?: Connection;
  public isMembers?: IsMember;

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
          type: DataTypes.ENUM,
          // allowNull: false,
          values: Object.values(faculty),
        },
        year: {
          type: DataTypes.STRING(1),
          defaultValue: '',
        },
        role: {
          type: DataTypes.STRING(255),
          defaultValue: '',
        },
        bio: {
          type: DataTypes.STRING(255),
          defaultValue: '',
        },
        image: {
          type: DataTypes.STRING(255),
          defaultValue: '',
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

    User.beforeCreate(async (user) => {
      // insert faculty and year according to user id
      const year = +getCurrentYear() - +getYearFromId(user.id);
      const fname = faculty[getFacultyCodeFromId(user.id)];

      user.year = year.toString();
      user.faculty = fname;
    });
  }

  // user add existing interest
  public addInterest!: BelongsToManyAddAssociationMixin<Interest, User>;
  public getInterests!: BelongsToManyGetAssociationsMixin<Interest>;
  public setInterests!: BelongsToManySetAssociationsMixin<Interest, User>
  public addConnection!: BelongsToManyAddAssociationMixin<User, { status: FriendStatus }>;
  public getConnection!: BelongsToManyGetAssociationsMixin<User>;

  /**
   * Adds interest from a given Array of InterestCreationAttrs to the user who calls this method.
   *
   * This is done via calling the `BelongsToManyAddAssociationMixin` on the `<Interest, User>` pair
   * @param {Description[]} interests - The array of interests the user is interested in.
   */
  public async addInterests(interests: InterestBody): Promise<Interest[]> {

    const result: Interest[] = [];

    for (let category in interests) {
      // select only valid interest description
      interests[category] = Interest.validateDescription(interests[category], Object.values(InterestDescription[category]));
      for (let interest of interests[category]) {
        const addedInterest = await Interest.findOne({ where: { description: interest } })

        // skip if interest not found
        if (!addedInterest) {
          continue;
        }

        await this.addInterest(addedInterest);
        result.push(addedInterest);
      }

    }
    return result;
    // for (let interest of interests) {
  }

  /**
   * A method to retreive user from database which include user's interest
   * @param userId
   * @returns
   */
  public static async fetchUser(userId: string): Promise<User | null> {
    return await User.findOne({ where: { id: userId }, include: 'interests' });
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
  /**
   * Get all pending connection requests
   *
   */
  public async getRequestConnection(): Promise<User[]> {
    const result: User[] = [];
    const connections = await this.getConnection();
    for (let conn of connections) {
      const status = await this.findRelation(conn.id);
      if (status === FriendStatus.Pending) {
        result.push(conn);
      }
    }
    return result;
  }
  /**
   * Method for finding all pending friend requests this user has received
   * @returns {User[]} - Array of all users who have send a friend request to current user
   */
  public async getReceivedFriendRequests() {
    const result: User[] = [];
    const constraint = { receiverId: this.id, status: FriendStatus.Pending };
    const receivedRequests: Connection[] = await Connection.findAll({ where: constraint });
    for (let conn of receivedRequests) {
      const user = await User.findOne({ where: { id: conn.senderId } });
      if (user) {
        result.push(user);
      }
    }

    return result;
  }
  /**
   * Method for finding all pending friend requests this user has send
   * @returns {User[]} - Array of all users who have received a friend request from current user
   */
  public async getSendFriendRequests() {
    const result: User[] = [];
    const constraint = { senderId: this.id, status: FriendStatus.Pending };
    const sendRequests: Connection[] = await Connection.findAll({ where: constraint });
    for (let conn of sendRequests) {
      const user = await User.findOne({ where: { id: conn.senderId } });
      if (user) {
        result.push(user);
      }
    }

    return result;
  }

  /**
   * A function for accepting the friend request. It first checks if the user whose id was passed in has sent
   * a friend request to the current user or not. If so, then it changes the friendStatus of the two according to the
   * passed in accepted parameter.
   * @param userId - the user who send the friend request
   * @param accepted - whether or not the current user accepts the friend request
   * @returns
   */

  public async acceptConnection(sendUser: User, accepted: Boolean): Promise<FriendStatus> {
    let relations = await Connection.findAll({
      where: { senderId: sendUser.id, receiverId: this.id },
    });

    if (relations.length === 0) {
      throw new BadRequestError('User has not send a request yet');
    }

    if (accepted) {
      await this.addConnection(sendUser);
      const recentAddedConn = await Connection.findAll({
        where: { senderId: this.id, receiverId: sendUser.id },
      });
      relations = relations.concat(recentAddedConn);
    }

    const status = accepted ? FriendStatus.Accept : FriendStatus.toBeDefined;

    for (let relation of relations) {
      if (accepted) {
        relation.status = status;
      } else {
        relation.status = status;
      }

      try {
        await relation.save();
      } catch (err) {
        throw new InternalServerError();
      }
    }

    return status;
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

  // public addRequest!: BelongsToManyAddAssociationMixin<IsMember, Team>;
  // public getRequest!: BelongsToManyGetAssociationsMixin<Team>;

  public async requestToJoin(team: Team) {
    await IsMember.create({
      teamName: team.name,
      userId: this.id,
      status: TeamStatus.Pending,
      sender: 'user',
    });
  }

  // the team(s) that created by myself + the team(s) that I belongs to
  public async getMyTeams(): Promise<Team[]> {
    let teams: Team[] = [];
    const myOwnTeams = await Team.findAll({ where: { creatorId: this.id } });
    if (myOwnTeams && myOwnTeams.length > 0) {
      teams = teams.concat(myOwnTeams);
    }

    // this find all except the creator himself
    const isMembers = await IsMember.findAll({
      where: { userId: this.id, status: TeamStatus.Accept },
    });

    for (let i = 0; i < isMembers.length; i++) {
      let team = await Team.findOne({ where: { name: isMembers[i].teamName } });
      if (team) {
        teams.push(team);
      }
    }
    return teams;
  }

  public toJSON(): IUserResponse {
    const values = { ...this.get() };
    let interests: string[] = [];
    if (this.interests) {
      interests = this.interests.map((interest) => interest.serializer());
    }

    if (this.connections) {
      delete values.connections;
    }

    return { ...values, interests };
  }

  public static associations: {
    interests: Association<Interest>;
    friend: Association<User, User>;
    teams: Association<User, Team>;
    member: Association<User, Team>;
  };
}

export { User };
