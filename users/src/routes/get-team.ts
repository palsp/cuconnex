import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Team } from '../models/team.model';
import { validateRequest, BadRequestError } from '@cuconnex/common';

const router = express.Router();

const bodyChecker = [
  body('name')
    .notEmpty()
    .isAlphanumeric()
];

router.get('/api/teams', bodyChecker, validateRequest, async (req: Request, res: Response) => {
  const { name } = req.body;

  const team = await Team.findOne({ where: { name: name } });

  if (!team) {
    throw new BadRequestError('Team not found!');
  }

  res.status(200).send({ team: team });
});

export { router as getTeamRouter };
