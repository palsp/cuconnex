import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '@cuconnex/common';
import { Team, IsMember, User } from '../models';
import { IUserResponse, ITeamResponse, IIsMemberResponse } from '../interfaces';
require('express-async-errors');

export const getTeam = async (req: Request, res: Response) => {
  const name = req.params.name;

  const team = await Team.findOne({ where: { name } });

  if (!team) {
    throw new NotFoundError('Team');
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
    throw new NotFoundError('Team');
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
    throw new NotFoundError('User');

    // else if มี receiver แต่ receiver not yet fill info.
  }

  if (!team) {
    throw new NotFoundError('Team');
  }

  const isInviterAMember = await IsMember.findOne({ where: { teamName, userId: sender.id } });
  if (!isInviterAMember) {
    throw new BadRequestError('The inviter is not a team member.');
  } else if (isInviterAMember.status !== 'Accept') {
    throw new BadRequestError('The inviter is not yet a team member.');
  }

  await team.inviteMember(receiver);
  const isMember = await IsMember.findOne({ where: { teamName: team.name, userId: newMemberId } });

  console.log('eiei', isMember);

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

export const getOutGoingRequests = async (req: Request, res: Response) => {
  const user = req.user!;
  const teamName = req.params.name;

  const team = await Team.findOne({ where: { name: teamName } });
  if (!team) {
    throw new NotFoundError('Team');
  }

  const isMember = await IsMember.findOne({ where: { teamName, userId: user.id } });
  if (!isMember) {
    throw new BadRequestError('The request user is not part of the team');
  }

  const response: IIsMemberResponse = await team.getOutgoingRequests();

  res.status(200).send(response);
};
