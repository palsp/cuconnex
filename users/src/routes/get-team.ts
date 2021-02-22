import express, { Request, Response } from 'express';
import { Team } from '../models/team.model';
import { NotFoundError } from '@cuconnex/common';

const router = express.Router();

router.get('/api/teams', async (req: Request, res: Response) => {
  const { teamId } = req.body;

  const team = await Team.findOne({ where: { teamId: teamId } });

  if (!team) {
    throw new NotFoundError();
  }

  res.status(200).send({ team: team });
});

export { router as getTeamRouter };
