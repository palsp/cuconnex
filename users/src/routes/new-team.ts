import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '@cuconnex/common';
import { Team } from '../models/team.model';
import { NotAuthorizedError, BadRequestError, requireAuth } from '@cuconnex/common';

const router = express.Router();

// need further implement ??

// when user try to create a team
router.post('/api/teams', validateRequest, async (req: Request, res: Response) => {
  // const userId = req.currentUser!.id;
  const { teamId, userId, teamName } = req.body;

  // if (!userId) {
  // throw new NotAuthorizedError();
  // }

  let team = await Team.findOne({ where: { teamName: teamName } });
  if (team) {
    throw new BadRequestError('Team name already existed');
  }

  let createSuccess;
  try {
    team = await Team.create({ teamId, userId, teamName });
    //   await user.createInterestsFromArray(uniqueInterests);
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

  res.status(201).send({ message: 'Create team succesfully.', id: team!.id, teamName: team!.name });
});

export { router as newTeamRouter };
