import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { NotFoundError, BadRequestError, TeamStatus, InternalServerError, getFacultyCodeFromId } from '@cuconnex/common';
import {
  User,
  Team,
  Interest,
  IsMember,
  Category,
  Event,
  Rating,
  Recommend,
  Faculty,
} from '../models';
import { deleteFile } from '../utils/file';
import {
  IFindRelationResponse,
  IUserResponse,
  IViewProfileResponse,
  ITeamResponse,
  IUserRequest,
  IIsMemberResponse,
  IAddRatingRequest,
  IRecommendTeam,
  IGetRateTeamResponse,
  IRecommendUserResponse,
  IGetRateUserOfTeamResponse,
} from '../interfaces';
import { EventStatus } from '@cuconnex/common/build/db-status/event';
import { includes } from 'lodash';
import { Connection } from '../models/connection.model';

/**
 * get current user profile
 * @param req
 * @param res
 * @returns
 */
export const getUser = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(302).send({});
    return;
  }

  const response: IUserResponse = req.user.toJSON();
  res.status(200).send(response);
};

/**
 * View other users profile
 * @param req
 * @param res
 * @returns
 */
export const viewUserProfile = async (req: Request, res: Response): Promise<void> => {
  const user = await User.fetchUser(req.params.userId);

  if (!user) {
    throw new NotFoundError();
  }

  const status = await user.findRelation(req.user!.id);

  const response: IViewProfileResponse = {
    ...user.toJSON(),
    status,
  };
  res.status(200).send(response);
};

/**
 * create user for first time login
 * @param req
 * @param res
 */
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { interests, name, role, bio } = req.body;
  let imagePath = '';
  if (req.file) {
    imagePath = req.file.path;
  }

  // Make sure that user does not exist
  let user = await User.findOne({ where: { id: req.currentUser!.id } });
  if (user) {
    throw new BadRequestError('User already existed');
  }


  user = await User.create({
    id: req.currentUser!.id,
    name,
    role,
    bio,
    image: imagePath,
  });

  const facultyCode = getFacultyCodeFromId(req.currentUser!.id);

  const faculty = await Faculty.findOne({ where: { code: facultyCode } });

  if(faculty){
    await faculty.addEnroll(user);
  }

  if (!user) {
    throw new InternalServerError();
  }

  try {
    await user.addInterests(interests);
  } catch (err) {
    await user.destroy();
    throw new InternalServerError();
  }

  const response: IUserResponse = {
    ...user!.toJSON(),
    faculty : faculty ? faculty.name : "",
    interests,
  };

  res.status(201).send(response);
};

/**
 * Method for editing any field of the user with the specified id.
 * Expects req.body to have a user object
 * If all checks pass, will update User with the fields specified
 * Then sends 200 alongside the newly updated user object.
 * @param req
 * @param res
 */
export const editUser = async (req: Request, res: Response) => {
  const updatedUser = req.body as IUserRequest;
  updatedUser.file = { ...req.file };

  const user = await User.findOne({ where: { id: req.user!.id }, include : [Faculty] });
  if (req.file) {
    if (user!.image !== '') {
      deleteFile(req.user!.image);
    }
    req.user!.image = updatedUser.file.path;
  }

  req.user!.name = updatedUser.name;
  req.user!.role = updatedUser.role;
  req.user!.bio = updatedUser.bio;
  await req.user!.setInterests([]); // delete all association with interests
  await req.user!.addInterests(updatedUser.interests); // add new interest
  req.user!.lookingForTeam = updatedUser.lookingForTeam;

  try {
    await req.user!.save();
  } catch (err) {
    throw new InternalServerError();
  }

  const response: IUserResponse = {
    ...req.user!.toJSON(),
  };

  res.status(200).send(response);
};

export const search = async (req: Request, res: Response) => {
  const keyword = req.query.keyword;

  const userConstraint = [
    { name: { [Op.startsWith]: keyword } },
    { id: { [Op.startsWith]: keyword } },
  ];

  /**
   * TODO: add role and lookingformember keyword for team search
   */
  const teamConstraint = { name: { [Op.startsWith]: keyword } };

  let users: User[] = [];
  let team: Team[] = [];
  try {
    users = await User.findAll({ where: { [Op.or]: userConstraint }, include: [Interest,Faculty] });
    team = await Team.findAll({ where: teamConstraint  , include : [{ model : User , as : 'member' , include : [Faculty]}]});
  } catch (err) {
    console.log(err);
  }

  const response = {
    users : users.map(user => user.toJSON()),
    team: team.map(team => team.toJSON()),
  }

  res.status(200).send(response);
};

export const findRelation = async (req: Request, res: Response) => {
  if (!req.params.userId) {
    throw new NotFoundError();
  }

  const conn = await User.findOne({ where: { id: req.params.userId } });
  if (!conn) {
    throw new NotFoundError();
  }

  const relation = await req.user!.findRelation(req.params.userId);

  const response: IFindRelationResponse = {
    status: relation,
  };
  res.status(200).send(response);
};

export const requestToJoinTeam = async (req: Request, res: Response) => {
  const user = req.user!;

  const { teamName } = req.body;

  const team = await Team.findOne({ where: { name: teamName } });
  if (!team) {
    throw new NotFoundError('Team');
  }

  const isMember = await IsMember.findOne({ where: { teamName, userId: user.id } });
  if (isMember) {
    throw new BadRequestError('The user already pending a request to this team.');
  }

  await user.requestToJoin(team);

  res.status(201).send({ message: 'Request pending', userId: user.id, team: team.name });
};

export const getInvitationNoti = async (req: Request, res: Response) => {
  try {
    const user = req.user!;

    const invitations = await IsMember.findAll({
      where: { userId: user.id, status: TeamStatus.Pending, sender: 'team' },
    });

    if (!invitations || invitations.length === 0) {
      // 204 === no content
      return res.status(204).send({ message: 'No invitaions', teams: [] });
    }

    var teams: ITeamResponse[] = [];
    for (let i = 0; i < invitations.length; i++) {
      let team = await Team.findOne({ where: { name: invitations[i].teamName } });
      if (team) {
        await team.fetchTeam();
        teams.push(team.toJSON());
      }
    }

    res.status(200).send({ message: 'Invitation(s) is/are from these teams.', teams: teams });
  } catch (err) {
    throw new BadRequestError(err.message);
  }
};

// get Team(s) that user is in
export const getListofTeamsBelongsTo = async (req: Request, res: Response) => {
  const user = await User.findOne({ where: { id: req.params.userId } });
  if (!user) {
    throw new NotFoundError();
  }

  const teams: Team[] = await user.getMyTeams();
  // if (teams.length === 0) {
  //   return res.status(200).send({ teams: [] });
  // }

  const teamsResponse: ITeamResponse[] = [];
  for (let team of teams) {
    await team.fetchTeam();
    
    teamsResponse.push(team.toJSON());
  }

  res.status(200).send({ teams: teamsResponse });
};

export const manageStatus = async (req: Request, res: Response) => {
  const user = req.user!;
  const { teamName, newStatusFromUser } = req.body;

  const team = await Team.findOne({ where: { name: teamName } });

  if (!team) {
    throw new NotFoundError('Team');
  }
  await team.editMemberStatus(user, newStatusFromUser);

  res
    .status(200)
    .send({ message: `Invitation from ${team.name} to ${user.name} is ${newStatusFromUser}.` });
};

export const getInterest = async (req: Request, res: Response): Promise<void> => {
  const categories = await Category.findAll({ include: 'interests' });

  if (!categories) {
    console.log(categories);
  }

  const response = categories.map((category: Category) => ({
    category: category.category,
    interests: category.interests!.map((interest: Interest) => interest.serializer()),
  }));
  res.status(200).send({ interests: response });
};

export const getMyRequests = async (req: Request, res: Response) => {
  const user = req.user!;

  const teams: Team[] = await user.getMyPendingRequestsTeams();
  // if (teams.length === 0) {
  //   return res.status(200).send({ teams: [] });
  // }

  const teamsResponse: ITeamResponse[] = [];
  for (let team of teams) {
    await team.fetchTeam();
    teamsResponse.push(team.toJSON());
  }

  res.status(200).send({ teams: teamsResponse });
};

export const getTeamStatus = async (req: Request, res: Response) => {
  const user = req.user!;

  const { teamName } = req.params;
  const team = await Team.findOne({ where: { name: teamName } });
  if (!team) {
    throw new NotFoundError('Team');
  }
  const response: IIsMemberResponse = await user.getMyStatusWith(team);
  res.status(200).send(response);
};

export const getRecommendUser = async (req: Request, res: Response) => {
  const users = await User.findAll({ where: { id: { [Op.not]: req.user!.id } } , include : [Faculty] });
  let result: {
    user: User;
    score: number;
  }[] = [];

  for (let user of users) {
    const status = await Connection.findConnection(req.user!.id , user.id);
    if(Connection.isConnection(status)){
      continue;
    }


    const score = await Recommend.CalculateScore(req.user!.id, user.id);
    result.push({ user, score });
  }


  // sort by score
  result.sort((a, b) => b.score - a.score);

  // TODO: create interface
  const response: IRecommendUserResponse = { users: result.map((r) => r.user.toJSON()) };

  res.status(200).send(response);
};

export const getRecommendTeam = async (req: Request, res: Response) => {
  const teams = await Team.findAll({ include : [{ model : User , as : 'member'}]});

  let result: {
    team: Team;
    score: number;
  }[] = [];

  for (let team of teams) {
    // DO not predict user's team
    const isMember = await team.findMember(req.user!.id);
    if (isMember) {
      continue;
    }
    let score: number;
    score = await req.user!.calculateTeamScore(team);
    result.push({ team, score });
  }

  result.sort((a, b) => b.score - a.score);

  const response: IRecommendTeam = { teams: result.map((r) => r.team.toJSON()) };

  res.status(200).send(response);
};

export const getRecommendTeamByEvent = async (req: Request, res: Response) => {
  const eventId = req.params.eventId;
  // const event = await Event.findOne({ where : { id : eventId} , include : [{ model : Team , as : "candidate", include : ['owner','member']}]})
  const event = await Event.findOne({
    where: { id: eventId },
    include: {
      model: Team,
      as: 'candidate',
      attributes: { include: ['name'] },
      include: [
        { model: User, as: 'owner', attributes: ['id'] },
        { model: User, as: 'member', attributes: ['id'] },
      ],
    },
  });

  if (!event) {
    throw new NotFoundError('Event');
  }
  let result: {
    team: Team;
    score: number;
  }[] = [];

  for (let team of event.candidate!) {
    // DO not predict user's team
    const isMember = await team.findMember(req.user!.id);
    if (isMember) {
      continue;
    }
    let score: number;
    score = await req.user!.calculateTeamScore(team);
    result.push({ team, score });
  }

  result.sort((a, b) => b.score - a.score);

  const response: IRecommendTeam = { teams: result.map((r) => r.team.toJSON()) };

  res.status(200).send(response);
};

export const getRateTeam = async (req: Request, res: Response) => {
  const events = await Event.findAll({
    where: { status: EventStatus.closed },
    include: [{ model: Team, as: 'candidate' }],
  });
  let myTeamInEvent = [];
  for (let event of events) {
    for (let candidate of event.candidate!) {
      // check if users is a member of the team
      const isMember = await candidate.findMember(req.user!.id);
      if (isMember) {
        // check if user rate all the member of the team
        const members = await candidate.getMembers();
        let isRate = true;
        for (let member of members) {
          if (member.id === req.user!.id) continue; // should not rate yourself

          const rate = await Rating.isRate(req.user!, member);

          if (!rate) {
            isRate = false;
            break;
          }
        }
        if (!isRate) {
          myTeamInEvent.push(candidate);
        }
        // stop iterate through candidates if users team is found
        break;
      }
    }
  }
  const response: IGetRateTeamResponse = {
    teams: myTeamInEvent.map((team) => team.toJSON()),
  };
  res.send(response);
};

export const getRateUserOfTeam = async (req: Request, res: Response) => {
  const team = await Team.findOne({
    where: { name: req.params.teamName },
    include: [
      { model: User, as: 'owner' },
      { model: User, as: 'member' },
    ],
  });

  if (!team) {
    throw new BadRequestError('Team not existed');
  }

  const isMember = await team.findMember(req.user!.id);

  if (!isMember) {
    throw new BadRequestError('You must be a part of the team in order to rate team members');
  }

  const rateUsers: User[] = [];

  if (team.owner!.id !== req.user!.id) {
    const rate = await Rating.isRate(req.user!, team.owner!);

    if (!rate) rateUsers.push(team.owner!);
  }

  for (let member of team.member!) {
    if (member.id === req.user!.id) continue;

    const rate = await Rating.isRate(req.user!, member);

    if (!rate) rateUsers.push(member);
  }

  const response: IGetRateUserOfTeamResponse = {
    ratees: rateUsers.map((user) => user.toJSON()),
  };
  res.status(200).send(response);
};

export const addRatings = async (req: Request, res: Response) => {
  const { rateeId, ratings } = req.body as IAddRatingRequest;
  const ratee = await User.findByPk(rateeId);

  if (!ratee) {
    throw new BadRequestError('ratee does not existed');
  }

  if (ratee.id === req.user!.id) {
    throw new BadRequestError('cannot rate yourself');
  }

  const rate = await Rating.findOne({ where: { raterId: req.user!.id, rateeId: ratee.id } });

  if (!rate) {
    throw new BadRequestError('please rate this user at the end of the event');
  }
  try {
    rate.rating = +ratings.toFixed(2);
    rate.isRate = true;
    await rate.save();
  } catch (err) {
    throw new InternalServerError();
  }
  res.status(201).send({});
};
