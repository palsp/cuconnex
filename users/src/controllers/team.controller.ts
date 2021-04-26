import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '@cuconnex/common';
import { Team, IsMember, User } from '../models';
import { IUserResponse, ITeamResponse, IIsMemberResponse } from '../interfaces';
require('express-async-errors');

export const getTeam = async (req: Request, res: Response) => {
  const name = req.params.name;

  const team = await Team.findOne({ where: { name } });

  if (!team) {
    throw new BadRequestError('Team not found!');
  }

  const response: ITeamResponse = team.toJSON();
  res.status(200).send(response);
};

export const createTeam = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const user = req.user!;

  const team = await Team.findOne({ where: { name } });
  if (team) {
    throw new BadRequestError('Team name already existed.');
  }

  let newTeam;
  try {
    newTeam = await user.createTeams({ name, description });
    await newTeam.addAndAcceptMember(user);
  } catch (err) {
    throw new BadRequestError('Create Team Failed');
  }
  const response: ITeamResponse = newTeam.toJSON();

  res.status(201).send(response);
};

export const getTeamMember = async (req: Request, res: Response) => {
  const teamName = req.params.name;

  const team = await Team.findOne({ where: { name: teamName } });

  if (!team) {
    throw new BadRequestError('Team not found!');
  }

  const acceptedUsers: User[] = await team.getMembers();

  const response: IUserResponse[] = acceptedUsers.map((eachUser) => {
    return eachUser.toJSON();
  });

  res.status(200).send(response);
};

/**
 *
 * @param req
 * @param res
 */
export const addTeamMember = async (req: Request, res: Response) => {
  const sender = req.user!;

  const { teamName, newMemberId } = req.body;

  //Find if there is a user in the database with the id we want to invite, and if their exists a team to add.
  const receiver = await User.findOne({ where: { id: newMemberId } });

  const team = await Team.findOne({ where: { name: teamName } });

  if (!receiver) {
    throw new BadRequestError('User not found!');

    // else if มี receiver แต่ receiver not yet fill info.
  }

  if (!team) {
    throw new BadRequestError('Team not found!');
  }

  const isInviterAMember = await IsMember.findOne({ where: { teamName, userId: sender.id } });
  if (!isInviterAMember) {
    throw new BadRequestError('The inviter is not a team member.');
  } else if (isInviterAMember.status !== 'Accept') {
    throw new BadRequestError('The inviter is not yet a team member.');
  }

  await team.inviteMember(receiver);

  res.status(201).send({ message: 'Invite pending', userId: receiver!.id, team: team!.name });
};

export const requetToJoinTeam = async (req: Request, res: Response) => {
  const user = req.user!;

  const { teamName } = req.body;

  const team = await Team.findOne({ where: { name: teamName } });
  if (!team) {
    throw new BadRequestError('Team not found!');
  }

  await team.inviteMember(user);

  res.status(201).send({ message: 'Request pending', userId: user.id, team: team.name });
};

export const manageStatus = async (req: Request, res: Response) => {
  const { targetUserId, teamName, status } = req.body;

  try {
    const team = await Team.findOne({ where: { name: teamName } });
    const targetUser = await User.findOne({ where: { id: targetUserId } });
    if (!team) {
      throw new BadRequestError('Team not found!');
    } else if (!targetUser) {
      throw new BadRequestError('User not found!');
    } else if (team.creatorId !== req.user!.id) {
      throw new BadRequestError('You are not the team creator!');
    }

    const member = await IsMember.findOne({ where: { teamName, userId: targetUserId } });
    if (!member) {
      throw new BadRequestError(`Status for ${targetUserId} and ${teamName} not found!`);
    }

    team.editMemberStatus(targetUser, status);

    res.status(200).send({ message: `Change status of ${targetUserId} to ${status}` });
  } catch (err) {
    throw new BadRequestError(err.message);
  }
};

export const getOutGoingRequests = async (req: Request, res: Response) => {
  const teamName = req.params.name;

  try {
    const team = await Team.findOne({ where: { name: teamName } });
    if (!team) {
      throw new BadRequestError('Team not found!');
    }

    const response: IIsMemberResponse = await team.getOutgoingRequests();

    return response;
  } catch (err) {
    throw new BadRequestError(err.message);
  }
};
