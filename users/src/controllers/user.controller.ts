import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { NotFoundError, BadRequestError, InterestDescription, TeamStatus } from '@cuconnex/common';
import { User, Team, Interest, IsMember } from '../models';
import { deleteFile } from '../utils/file';
import { IIsMemberResponse, IFindRelationResponse, IUserResponse, IViewProfileResponse } from '../interfaces';

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
    if (req.file.size > 1024 * 1024 * 1024) {
      deleteFile(imagePath);
      throw new BadRequestError('Max File Size Exceeded!! Max file size is 1 GB');
    }
  }

  // Make sure that user does not exist
  let user = await User.findOne({ where: { id: req.currentUser!.id } });
  if (user) {
    throw new BadRequestError('User already existed');
  }

  let createsuccess = false;
  // create users

  try {
    user = await User.create({ id: req.currentUser!.id, name, role, bio, image: imagePath });
    createsuccess = true;
    for (let category in interests) {
      // select only valid interest description
      interests[category] = Interest.validateDescription(
        interests[category],
        Object.values(InterestDescription[category])
      );
      await user.addInterestFromArray(interests[category]);
    }
  } catch (err) {
    createsuccess = false;
    console.log(err.message);
  }

  // destroy the created resource if something goes wrong
  if (!createsuccess && user) {
    await user.destroy();
    throw new BadRequestError('Create User Failed');
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

export const getInvitationNoti = async (req: Request, res: Response) => {
  try {
    const user = req.user!;

    const invitations = await IsMember.findAll({
      where: { userId: user.id, status: TeamStatus.Pending },
    });

    if (!invitations || invitations.length === 0) {
      // 204 === no content
      return res.status(204).send({ message: 'No invitaions', teams: [] });
    }

    var teams = [];
    for (let i = 0; i < invitations.length; i++) {
      teams.push(invitations[i].teamName);
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

  const isMembers = await IsMember.findAll({ where: { userId: user.id } });

  let returnTeams: any = [];
  if (isMembers) {
    isMembers.filter((isMember) => {
      if (isMember.status === TeamStatus.Accept) {
        returnTeams.push(isMember.teamName);
      }
    });
  }

  res.status(200).send({ teams: returnTeams });
};

export const manageStatus = async (req: Request, res: Response) => {
  const user = req.user!;
  const { teamName, newStatusFromUser } = req.body;

  try {
    const team = await Team.findOne({ where: { name: teamName } });

    if (!team) {
      throw new BadRequestError('Team not found');
    }
    await team.editMemberStatus(user, newStatusFromUser);

    res
      .status(200)
      .send({ message: `Invitation from ${team.name} to ${user.name} is ${newStatusFromUser}.` });
  } catch (err) {
    throw new BadRequestError(err.message);
  }
};

export const getInvitationRequestOfTeam = async (req: Request, res: Response) => {
  const user = req.user!;
  const teamName = req.params.teamName;

  try{
    const isMembers = await IsMember.findAll({where: { teamName }})

    if(!isMembers) {
      throw new BadRequestError('No relation found with any user')
    }


    
    // const response:IIsMemberResponse = rr

    return
  }
}