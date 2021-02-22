import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, NotFoundError } from '@cuconnex/common';
import { Team } from '../models/team.model';
import { User } from '../models/user.model';
import { NotAuthorizedError, BadRequestError, requireAuth } from '@cuconnex/common';

const router = express.Router();

// when user try to create a team
router.post('/api/teams', validateRequest, async (req: Request, res: Response) => {
  // must check that req.userId === req.currentUser!.id
  // const userId = req.currentUser!.id;

  //dummy userId
  const userId = '6131707021';
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    throw new NotFoundError();
  }

  console.log('check user 111', user);

  const { teamId, teamName } = req.body;

  if (!userId) {
    throw new NotAuthorizedError();
  }

  let team = await Team.findOne({ where: { teamName: teamName } });
  if (team) {
    console.log('err', team);
    throw new BadRequestError('Team name already existed');
  }
  console.log('team', team);

  let createSuccess;
  try {
    console.log('eiei');
    team = await Team.create({ userId, teamId, teamName });
    // await user.createTeams(team);
    console.log('check user 2', user);
    console.log('check team', team);

    createSuccess = true;
  } catch (err) {
    createSuccess = false;
  }
  // if something went wrong clear all team information in database
  // user need to retry from the beginning!!
  if (!createSuccess && team) {
    await team.destroy();
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
