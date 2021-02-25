import express, { Request, Response } from 'express';
import { Team } from '../models/team.model';
import { BadRequestError } from '@cuconnex/common';

const router = express.Router();

router.get('/api/teams', async (req: Request, res: Response) => {
  const { name } = req.body;

  const team = await Team.findOne({ where: { name: name } });

  if (!team) {
    throw new BadRequestError('Team not found!');
  }

  res.status(200).send({ team: team });
});

export { router as getTeamRouter };
