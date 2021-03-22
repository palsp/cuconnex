import express, { Request, Response } from 'express';
import { Team } from '../../models/team.model';
import { BadRequestError, validateRequest } from '@cuconnex/common';
import { body } from 'express-validator';
import { requireUser } from '../../middlewares/requireUser';

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
