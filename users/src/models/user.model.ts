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
        },
        image: {
          type: DataTypes.STRING(255),
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
   * It is expected to recieved array of interests from the request.
   * This method will add all of the interest that existed in the db 
   * to user
   * @param interests 
   */
  public async addInterestFromArray(interests: Description[]) {
    for (let interest of interests) {
      try {
        // find interest in db
        const addedInterest = await Interest.findOne({ where: { description: interest } });

        await this.addInterest(addedInterest!);
      } catch (err) {
        console.log(err);
      }
    }
  }




  /**
   * It will return connection type between this and a given user
   * @param userId 
   * @returns {FriendStatus | null}
   */
  public async findRelation(userId: string): Promise<FriendStatus | null> {
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
   * @param user 
   * @returns 
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
   * Find User with specific if in the database
   * @param userId 
   * @returns 
   */
  public static async findUser(userId: string): Promise<User> {
    const user = await User.findByPk(userId);

    // check if user who is added exists in the database
    if (!user) {
      throw new NotFoundError();
    }

    return user;
  }




  public async acceptConnection(userId: string, accpeted: Boolean): Promise<FriendStatus> {
    const relation = await Connection.findOne({ where: { senderId: userId, receiverId: this.id } });

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
      description: attrs.description,
    });
  }

  public static associations: {
    interests: Association<Interest>;
    friend: Association<User, User>;
    teams: Association<User, Team>;
    member: Association<User, Team>;
  };
}



export { User };
