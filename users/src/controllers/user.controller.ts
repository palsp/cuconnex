import { Request, Response } from 'express';
import { Op } from 'sequelize';
import {
  NotFoundError,
  BadRequestError,
  InterestDescription,
  TeamStatus,
  InternalServerError,
} from '@cuconnex/common';
import { User, Team, Interest, IsMember, Category } from '../models';
import { deleteFile } from '../utils/file';
import {
  IFindRelationResponse,
  IUserResponse,
  IViewProfileResponse,
  ITeamResponse,
  IUserRequest,
} from '../interfaces';
import { userRouter } from '../routes';
//Test for empty object
function isEmpty(obj: Object) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}
function isNull(obj: Object) {
  Object.keys(obj).map((key) => {
    if (!key) return false;
  });
  return true;
}

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

  user = await User.create({ id: req.currentUser!.id, name, role, bio, image: imagePath });
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
    interests,
  };

  res.status(201).send(response);
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

  let users: User[];
  let team: Team[];
  try {
    users = await User.findAll({ where: { [Op.or]: userConstraint }, include: 'interests' });
    team = await Team.findAll({ where: teamConstraint });
  } catch (err) {
    console.log(err);
  }

  res.status(200).send({
    users: users! || [],
    team: team! || [],
  });
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

export const requetToJoinTeam = async (req: Request, res: Response) => {
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

  if (req.file) {
    deleteFile(req.user!.image);
    req.user!.image = updatedUser.file.path;
  }

  req.user!.name = updatedUser.name;
  req.user!.role = updatedUser.role;
  req.user!.bio = updatedUser.bio;
  await req.user!.setInterests([]); // delete all association with interests
  const interests = await req.user!.addInterests(updatedUser.interests); // add new interest
  req.user!.lookingForTeam = updatedUser.lookingForTeam;

  try {
    await req.user!.save();
  } catch (err) {
    throw new InternalServerError();
  }

  req.user!.interests = interests; // attach new interest to users

  const response: IUserResponse = {
    ...req.user!.toJSON(),
  };

  res.status(200).send(response);
};
// get Team(s) that user is in
export const getListofTeamsBelongsTo = async (req: Request, res: Response) => {
  const user = await User.findOne({ where: { id: req.params.userId } });
  if (!user) {
    throw new NotFoundError();
  }

  const teams: Team[] = await user.getMyTeams();
  if (teams.length === 0) {
    return res.status(200).send({ teams: [] });
  }

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
  if (teams.length === 0) {
    return res.status(200).send({ teams: [] });
  }

  const teamsResponse: ITeamResponse[] = [];
  for (let team of teams) {
    await team.fetchTeam();
    teamsResponse.push(team.toJSON());
  }

  res.status(200).send({ teams: teamsResponse });
};
