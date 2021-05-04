import {
  Model,
  DataTypes,
  Sequelize,
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToGetAssociationMixin,
} from 'sequelize';

import { TableName } from './types';

import { IsMember } from './isMember.model';
import { User } from './user.model';
import { Event } from './event.model';
import { Candidate } from './candidate.model';

import { TeamStatus, BadRequestError } from '@cuconnex/common';

import { ITeamResponse, IUserResponse, ITeamRequestResponse, IEventResponse } from '../interfaces';
import { Recommend } from './recommend.model';
import { Connection } from './connection.model';
import { Faculty } from './faculty.model';

// keep member array as id of user
export interface TeamAttrs {
  name: string;
  creatorId: string;
  description: string;
  lookingForMembers: boolean;
  image: string;
  currentRecruitment: string;

  members?: User[];
  eventsParticipating?: Event[];
  member?: User[];
  owner?: User;
}

export interface TeamCreationAttrs {
  name: string;
  description: string;
  image?: string;
  currentRecruitment?: string;
}

class Team extends Model<TeamAttrs, TeamCreationAttrs> {
  public name!: string;
  public creatorId!: string;
  public description!: string;
  public lookingForMembers: boolean = true;
  public members?: User[];
  public eventsParticipating?: Event[];
  public image!: string;
  public currentRecruitment?: string;
  public owner?: User;
  public member?: User[];

  public static autoMigrate(sequelize: Sequelize) {
    Team.init(
      {
        name: {
          type: DataTypes.STRING(255),
          primaryKey: true,
        },
        creatorId: {
          type: DataTypes.STRING(11),
          allowNull: false,
          primaryKey: true,
          references: {
            model: User,
          },
        },
        description: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        lookingForMembers: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING(255),
          defaultValue: '',
        },
        currentRecruitment: {
          type: DataTypes.STRING(255),
          defaultValue: '',
        },
      },
      {
        tableName: TableName.teams,
        sequelize,
        timestamps: false,
      }
    );
  }

  public getOwner!: BelongsToGetAssociationMixin<User>;

  // this addMember function just create PENDING status not ACCEPTED -> try use the 'addAndAcceptMember' function instead
  public addMember!: BelongsToManyAddAssociationMixin<IsMember, User>;
  // public addMember!: BelongsToManyAddAssociationMixin<User, { status: TeamStatus }>;
  public getMember!: BelongsToManyGetAssociationsMixin<User>;

  // create PENDING status to the user
  public async invite(user: User) {
    let isMember = await IsMember.findOne({ where: { teamName: this.name, userId: user.id } });

    // if there is a member status : 'accept || reject || pending ' do nothing
    if (isMember) {
      throw new BadRequestError(`This user already have status: ${isMember.status}`);
    }

    await IsMember.create({
      teamName: this.name,
      userId: user.id,
      status: TeamStatus.Pending,
      sender: 'team',
    });
  }

  // edit can be use to ACCEPT or REJECT status
  public async editMemberStatus(user: User, status: TeamStatus) {
    const isMember = await IsMember.findOne({ where: { teamName: this.name, userId: user.id } });

    // no status with this user yet
    if (!isMember) {
      throw new BadRequestError(`User ${user.id} does not have any status yet`);
    }

    isMember.status = status;
    try {
      await isMember.save();
    } catch (err) {
      throw new BadRequestError(err.message);
    }
  }

  // this will promptly create ACCEPT status for user promptly
  public async add(user: User) {
    const isMember = await IsMember.findOne({ where: { teamName: this.name, userId: user.id } });

    if (isMember) {
      // if user already accepted in the team
      if (isMember.status === TeamStatus.Accept) {
        throw new BadRequestError(`This user is already part of the team`);

        // if user have other status, just bring him/her in the team
      } else {
        isMember.status = TeamStatus.Accept;
        await isMember.save();
      }
      return;
    }

    const newIsMember = await IsMember.create({
      teamName: this.name,
      userId: user.id,
      status: TeamStatus.Accept,
      sender: 'team',
    });
    if (!newIsMember) {
      throw new BadRequestError('IsMember db went wrong');
    }

    return;
  }

  // check if member part of the team
  public async findMember(userId: string): Promise<Boolean> {
    if (userId === this.creatorId) {
      return true;
    }

    const isMember = await IsMember.findOne({ where: { teamName: this.name, userId } });
    if (isMember) {
      if (isMember.status === TeamStatus.Accept) {
        return true;
      }
    }
    return false;
  }

  public async getIncomingRequests(): Promise<ITeamRequestResponse> {
    const isMembers = await IsMember.findAll({
      where: { teamName: this.name, status: TeamStatus.Pending, sender: 'user' },
    });

    let pendingUsers: IUserResponse[] = [];
    for (let i = 0; i < isMembers.length; i++) {
      let user = await User.findByPk(isMembers[i].userId);
      pendingUsers.push(user!.toJSON());
    }

    const response: ITeamRequestResponse = {
      teamName: this.name,
      pendingUsers,
    };

    return response;
  }

  public async getOutgoingRequests(): Promise<ITeamRequestResponse> {
    const isMembers = await IsMember.findAll({
      where: { teamName: this.name, status: TeamStatus.Pending, sender: 'team' },
    });

    let pendingUsers: IUserResponse[] = [];
    for (let i = 0; i < isMembers.length; i++) {
      let user = await User.findByPk(isMembers[i].userId);
      pendingUsers.push(user!.toJSON());
    }

    const response: ITeamRequestResponse = {
      teamName: this.name,
      pendingUsers,
    };

    return response;
  }

  // get accepted members
  public async getMembers(): Promise<User[]> {
    const membersWithAllStatus: User[] = await this.getMember({ include : [Faculty]});

    const acceptedUsers = membersWithAllStatus.filter((member: User) => {
      if (member.IsMember!.status === TeamStatus.Accept) {
        return member;
      }
    });

    const creator = await User.findByPk(this.creatorId);
    acceptedUsers.push(creator!);

    return acceptedUsers;
  }

  public async fetchTeam() {
    const members: User[] = await this.getMembers();
    const events: Event[] = await this.getCandidate();
    this.member = members;
    this.eventsParticipating = events;
  }

  /**
   * This function is for complex query, its functionality is the same as CalculateUserScore
   * before function call, make sure that team's owner and team's member is included
   * with team instance
   * @param userId
   */
  public async CalculateUserScoreComplexQuery(userId: string): Promise<number> {
    let meanScore;
    const ownerRecommend = this.owner!.recommendation;
    if (!ownerRecommend) {
      const status = await Connection.findConnection(userId, this.owner!.id);
      const score = Connection.isConnection(status) ? 4 : 0;
      meanScore = score;
    } else {
      meanScore = ownerRecommend[0].Recommend!.score;
    }

    for (let member of this.member!) {
      const MemberRecommend = member.recommendation;
      if (!MemberRecommend) {
        const status = await Connection.findConnection(userId, member.id);
        const score = Connection.isConnection(status) ? 4 : 0;
        meanScore += score;
      } else {
        meanScore += MemberRecommend[0].Recommend!.score;
      }
    }
    return meanScore / (this.member!.length + 1);
  }

  public async CalculateUserScore(userId: string): Promise<number> {
    if (!this.owner) {
      this.owner = await this.getOwner();
    }

    if (!this.member) {
      this.member = await this.getMember({include : [Faculty]});
    }

    // score from team owner
    let meanScore = await Recommend.CalculateScore(this.owner.id, userId);

    for (let member of this.member) {
      meanScore += await Recommend.CalculateScore(member.id, userId);
    }

    return meanScore / (this.member.length + 1);
  }
  // public addCandidate!: BelongsToManyAddAssociationMixin<Candidate, Event>;
  public getCandidate!: BelongsToManyGetAssociationsMixin<Event>;

  public async register(event: Event) {
    const isCandidate = await Candidate.findOne({
      where: { eventId: event.id, teamName: this.name },
    });

    if (isCandidate) {
      throw new BadRequestError('This team already register for this event.');
    }

    try {
      await Candidate.create({ eventId: event.id, teamName: this.name });
    } catch (err) {
      throw new BadRequestError(`Candidate table error: ${err.message}`);
    }
  }

  public async getMyEvents(): Promise<Event[]> {
    const candidates = await this.getCandidate();
    // console.log('candy', candidates);
    // let connections = await this.getConnection({ include : [Interest]});

    let events: Event[] = [];

    for (let i = 0; i < candidates.length; i++) {
      events.push(candidates[i]);
    }

    return events;
  }

  public toJSON(): ITeamResponse {
    const values = { ...this.get() };

    let returnMembers: IUserResponse[] = [];
    
    if (this.member) {
      returnMembers = this.member.map((member: User) => member.toJSON());
    }

    delete values.member;
  
    // return { ...values, members: returnMembers, eventsParticipating: returnEvents };
    return { ...values, members: returnMembers };
  }
}

export { Team };
