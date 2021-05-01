import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '@cuconnex/common';
import { Team, IsMember, User, Event } from '../models';
import {
  IUserResponse,
  ITeamResponse,
  IIsMemberResponse,
  ITeamRequestResponse,
} from '../interfaces';

require('express-async-errors');

export const getTeam = async (req: Request, res: Response) => {
  const name = req.params.name;

  const team = await Team.findOne({ where: { name } });

  if (!team) {
    throw new NotFoundError('Team');
  }

  await team.fetchTeam();

  const response: ITeamResponse = team.toJSON();
  res.status(200).send({ team: response });
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
  } catch (err) {
    throw new BadRequestError('Create Team Failed');
  }

  await newTeam.fetchTeam();
  const response: ITeamResponse = newTeam.toJSON();

  res.status(201).send({ team: response });
};

export const getTeamMember = async (req: Request, res: Response) => {
  const teamName = req.params.name;

  const team = await Team.findOne({ where: { name: teamName } });

  if (!team) {
    throw new NotFoundError('Team');
  }

  const acceptedUsers: User[] = await team.getMembers();

  const response: IUserResponse[] = acceptedUsers.map((eachUser) => {
    return eachUser.toJSON();
  });

  res.status(200).send({ users: response });
};

/**
 *
 * @param req
 * @param res
 */

export const inviteMember = async (req: Request, res: Response) => {
  const sender = req.user!;

  const { teamName, newMemberId } = req.body;

  //Find if there is a user in the database with the id we want to invite, and if their exists a team to add.
  const receiver = await User.findOne({ where: { id: newMemberId } });

  const team = await Team.findOne({ where: { name: teamName } });

  if (!receiver) {
    throw new NotFoundError('User');

    // else if มี receiver แต่ receiver not yet fill info.
  }

  if (!team) {
    throw new NotFoundError('Team');
  }

  const isInviterAMember = await team.findMember(sender.id);
  if (!isInviterAMember) {
    throw new BadRequestError('The inviter is not a team member.');
  }

  try {
    await team.invite(receiver);
  } catch (err) {
    throw new BadRequestError(err.message);
  }

  res.status(201).send({ message: 'Invite pending', userId: receiver!.id, team: team!.name });
};

export const manageStatus = async (req: Request, res: Response) => {
  const { targetUserId, teamName, status } = req.body;

  const team = await Team.findOne({ where: { name: teamName } });
  const targetUser = await User.findOne({ where: { id: targetUserId } });
  if (!team) {
    throw new NotFoundError('Team');
  } else if (!targetUser) {
    throw new NotFoundError('User');
  } else if (team.creatorId !== req.user!.id) {
    throw new BadRequestError('You are not the team creator!');
  }

  const member = await IsMember.findOne({ where: { teamName, userId: targetUserId } });
  if (!member) {
    throw new BadRequestError(`Status for ${targetUserId} and ${teamName} not found!`);
  }

  team.editMemberStatus(targetUser, status);

  res.status(200).send({ message: `Change status of ${targetUserId} to ${status}` });
};

export const getOutgoingRequests = async (req: Request, res: Response) => {
  const user = req.user!;
  const teamName = req.params.name;

  const team = await Team.findOne({ where: { name: teamName } });
  if (!team) {
    throw new NotFoundError('Team');
  }

  const isMember = await team.findMember(user.id);
  if (!isMember) {
    throw new BadRequestError('The request user is not part of the team');
  }

  const response: ITeamRequestResponse = await team.getOutgoingRequests();

  res.status(200).send({ outgoingRequests: response });
};

export const getIncomingRequests = async (req: Request, res: Response) => {
  const user = req.user!;
  const teamName = req.params.name;

  const team = await Team.findOne({ where: { name: teamName } });
  if (!team) {
    throw new NotFoundError('Team');
  }

  if (user.id !== team.creatorId) {
    // throw new NotAuthorizedError(); // this not return 401 I dont know why ??
    throw new BadRequestError('The requester is not the team creator.');
  }

  const response: ITeamRequestResponse = await team.getIncomingRequests();

  res.status(200).send({ incomingRequests: response });
};

export const registerEvent = async (req: Request, res: Response) => {
  const user = req.user!;
  const { eventId, teamName } = req.body;

  const team = await Team.findOne({ where: { name: teamName } });
  if (!team) {
    throw new NotFoundError('Team');
  }

  const event = await Event.findOne({ where: { id: eventId } });
  if (!event) {
    throw new NotFoundError('Event');
  }

  if (user.id !== team.creatorId) {
    // throw new NotAuthorizedError(); // this not return 401 I dont know why ??
    throw new BadRequestError('The requester is not the team creator.');
  }

  await team.register(event);
  res.status(200).send();
};
