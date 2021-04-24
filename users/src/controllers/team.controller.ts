import { Request, Response } from 'express';
import { BadRequestError } from '@cuconnex/common';
import { Team, Member, User } from '../models';
require('express-async-errors');

export const getTeam = async (req: Request, res: Response) => {
  const name = req.params.name;

  const team = await Team.findOne({ where: { name } });

  if (!team) {
    throw new BadRequestError('Team not found!');
  }

  res.status(200).send({ team: team });
};

export const createTeam = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const user = req.user!;

  const team = await Team.findOne({ where: { name } });
  if (team) {
    throw new BadRequestError('Team name already existed.');
  }

  let newTeam;
  let status;
  try {
    newTeam = await user.createTeams({ name, description });
    await newTeam.addAndAcceptMember(user);

    // status = await Member.create({
    //   userId: user.id,
    //   teamName: name,
    //   status: TeamStatus.Accept,
    // });
  } catch (err) {
    throw new BadRequestError('Create Team Failed');
  }

  res.status(201).send({
    creatorId: user.id,
    name: newTeam!.name,
    status,
  });
};

export const getTeamMember = async (req: Request, res: Response) => {
  const teamName = req.params.name;

  const team = await Team.findOne({ where: { name: teamName } });

  if (!team) {
    throw new BadRequestError('Team not found!');
  }

  /**
   * TODO: It should return all user information such as bio and interests , it returns onlt userId and Status
   */
  //   const members = await Member.findAll({ where: { teamName } });
  const members = await team.getMember();

  res.status(200).send({ members: members });
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

  const isInviterAMember = await Member.findOne({ where: { teamName, userId: sender.id } });
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
