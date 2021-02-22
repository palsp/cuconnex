import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, NotFoundError } from '@cuconnex/common';
import { Team } from '../models/team.model';
import { User } from '../models/user.model';
import { NotAuthorizedError, BadRequestError, requireAuth } from '@cuconnex/common';

const router = express.Router();

// when user try to create a team
router.post('/api/teams', validateRequest, async (req: Request, res: Response) => {
  const { userId, teamId, teamName } = req.body;

  // if (!userId || userId !== req.currentUser!.id) {
  //   throw new NotAuthorizedError();
  // }

  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    throw new NotFoundError();
  }

  let team = await Team.findOne({ where: { teamName: teamName } });
  if (team) {
    throw new BadRequestError('Team name already existed');
  }
  console.log('www', req.body);
  let createSuccess;
  try {
    // team = await Team.create({ teamId, userId, teamName });
    // console.log('yes', team._attributes.userId);
    console.log('yes', team);
    const eiei = await user.createTeams({ teamId, userId, teamName });
    // console.log('check eiei ', eiei);
    createSuccess = true;
  } catch (err) {
    console.log('create failed', err);
    createSuccess = false;
  }

  // if something went wrong clear all team information in database
  // user need to retry from the beginning!!
  if (!createSuccess && team) {
    // await team.destroy();
    throw new Error('Something went wrong');
  }

  res.status(201).send({
    message: `Create team succesfully by ${userId}.`,
    userId,
    teamId: team!.teamId,
    teamName: team!.teamName
  });
});

export { router as newTeamRouter };
