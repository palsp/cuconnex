import express, { Request, Response, NextFunction } from 'express';
import { Member } from '../models/member.model';
import { User } from '../models/user.model';
import { Team } from '../models/team.model';

import { requireAuth, NotFoundError, BadRequestError } from '@cuconnex/common';

const router = express.Router();

// change status to approve / reject by creator of the team
router.get('/api/members/status', async (req: Request, res: Response, next: NextFunction) => {
  const creatorId = req.currentUser!.id;
  const { userId, teamName, status } = req.body;

  const team = await Team.findOne({ where: { name: teamName } });
  const user = await User.findOne({ where: { id: userId } });
  if (!team) {
    throw new BadRequestError('Team not found!');
  } else if (!user) {
    throw new BadRequestError('User not found!');
  } else if (team.userId !== creatorId) {
    throw new BadRequestError('You are not the team creator!');
  }

  const member = await Member.findOne({ where: { teamName, userId } });
  if (!member) {
    throw new BadRequestError(`Status for ${userId} and ${teamName} not found!`);
  }

  member.status = status;
  member.save();

  res.status(200).send({ message: `Change status of ${userId} to ${status}` });
});

export { router as memberStatusRouter };
