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
  BelongsToManySetAssociationsMixin,
  BelongsToGetAssociationMixin,
} from 'sequelize';
import {
  BadRequestError,
  TeamStatus,
  FriendStatus,
  getCurrentYear,
  getYearFromId,
  InternalServerError,
  InterestDescription,
} from '@cuconnex/common';

import { TableName } from './types';
import { Team, TeamCreationAttrs } from './team.model';
import { Interest } from './interest.model';
import { Connection } from './connection.model';
import { IsMember } from './isMember.model';
import { IIsMemberResponse, InterestBody, IUserResponse } from '../interfaces';
import { Recommend } from './recommend.model';
import { Rating } from './rating.model';
import { Faculty } from './faculty.model';
import { fakeServerWithClock } from 'sinon';

// All attributes in user model
interface UserAttrs {
  id: string;
  name: string;
  image: string;
  facultyCode?: string;
  year?: string;
  role: string;
  bio: string;
  faculty? : string;
  lookingForTeam: boolean;
  Interests?: Interest[];
  friends?: User[];
  Connection?: Connection;
  IsMember?: IsMember;
  Recommend?: Recommend;
  recommendation?: User[];
  Rating?: Rating;
  Faculty? : Faculty;
}

interface UserCreationAttrs {
  id: string;
  name: string;
  image?: string;
  lookingForTeam?: boolean;
  role?: string;
  bio?: string;
  faculty?: string;
}

class User extends Model<UserAttrs, UserCreationAttrs> {
  public id!: string;
  public name!: string;

  public faculty? : string;
  public facultyCode?: string;
  public image!: string;
  public lookingForTeam: boolean = true;
  public year!: string;
  public role!: string;
  public bio!: string;
  public recommendation?: User[];

  public Interests?: Interest[];
  public Connection?: Connection;
  public IsMember?: IsMember;
  public Recommend?: Recommend;
  public Rating?: Rating;
  public Faculty? : Faculty;

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
      // const fname = faculty[getFacultyCodeFromId(user.id)];

      user.year = year.toString();
      // user.faculty = fname;
    });
  }

  // user add existing interest
  public addInterest!: BelongsToManyAddAssociationMixin<Interest, User>;
  public getInterests!: BelongsToManyGetAssociationsMixin<Interest>;
  public setInterests!: BelongsToManySetAssociationsMixin<Interest, User>;
  public addConnection!: BelongsToManyAddAssociationMixin<
    User,
    { through: { status: FriendStatus } }
  >;
  public getConnection!: BelongsToManyGetAssociationsMixin<User>;
  public getRecommendation!: BelongsToManyGetAssociationsMixin<User>;
  public addRecommendation!: BelongsToManyAddAssociationMixin<User, { through: { score: number } }>;
  public createTeam!: HasManyCreateAssociationMixin<Team>;
  public getTeams!: HasManyGetAssociationsMixin<Team>;
  public addRatee!: BelongsToManyAddAssociationMixin<User, { through: { rating: number } }>;
  public getRatee!: BelongsToManyGetAssociationsMixin<User>;
  public getFaculty!: BelongsToGetAssociationMixin<Faculty>

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
      interests[category] = Interest.validateDescription(
        interests[category],
        Object.values(InterestDescription[category])
      );
      for (let interest of interests[category]) {
        const addedInterest = await Interest.findOne({ where: { description: interest } });

        // skip if interest not found
        if (!addedInterest) {
          continue;
        }

        await this.addInterest(addedInterest);
        result.push(addedInterest);
      }
    }
    return result;
  }

  /**
   * A method to retreive user from database which include user's interest
   * @param userId
   * @returns
   */
  public static async fetchUser(userId: string): Promise<User | null> {
    return User.findOne({ where: { id: userId }, include: [Interest,Faculty] });
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

  public async getAllConnectionWithStatus(status: FriendStatus): Promise<User[]> {
    let connections = await this.getConnection({ include: [Interest] });

    connections = connections.filter((conn) => conn.Connection!.status === status);

    return connections;
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
      const user = await User.findOne({ where: { id: conn.senderId }, include: Interest });
      if (user) {
        result.push(user);
      }
    }

    return result;
  }

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
      image: attrs.image,
      currentRecruitment: attrs.currentRecruitment,
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

  public async getMyPendingRequestsTeams(): Promise<Team[]> {
    let teams: Team[] = [];
    const isMembers = await IsMember.findAll({
      where: { userId: this.id, status: TeamStatus.Pending, sender: 'user' },
    });

    if (!isMembers) {
      return teams;
    }

    for (let i = 0; i < isMembers.length; i++) {
      let team = await Team.findOne({ where: { name: isMembers[i].teamName } });
      if (team) {
        teams.push(team);
      }
    }

    return teams;
  }

  public async calculateTeamScore(team: Team) {
    if (!team.owner) {
      team.owner = await team.getOwner();
    }

    if (!team.member) {
      team.member = await team.getMember();
    }

    // TODO: double check with bird whether owner is in isMember Table
    // let meanScore = await Recommend.CalculateScore(this.id, team.owner.id);
    let meanScore = 0;

    for (let member of team.member) {
      meanScore += await Recommend.CalculateScore(this.id, member.id);
    }

    return meanScore / (team.member.length + 1);
  }

  public async getMyStatusWith(team: Team): Promise<IIsMemberResponse> {
    if (this.id === team.creatorId) {
      return { status: TeamStatus.Accept, sender: '' };
    }
    const isMember = await IsMember.findOne({ where: { userId: this.id, teamName: team.name } });
    if (!isMember) {
      return { status: null, sender: '' };
    }

    const response: IIsMemberResponse = {
      status: isMember.status,
      sender: isMember.sender,
    };

    return response;
  }

  public toJSON(): IUserResponse {
    const values = { ...this.get() };
    let interests: string[] = [];
    if (this.Interests) {
      interests = this.Interests.map((interest) => interest.serializer());
    }

    delete values.Interests;

    if (this.Connection) {
      delete values.Connection;
    }

    if(this.Faculty){
      values.faculty = this.Faculty.name
    }else{
      values.faculty = ""
    }
  
    delete values.Faculty;
    delete values.Rating;

    return { ...values, interests };
  }

  public static associations: {
    interests: Association<Interest>;
    connection: Association<User, User>;
    teams: Association<User, Team>;
    member: Association<User, Team>;
    recommendation: Association<User, User>;
  };
}

export { User };
