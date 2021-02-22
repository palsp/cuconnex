import express, { Request, Response, NextFunction } from 'express';
import { Member } from '../models/member.model';
import { Team } from '../models/team.model';
import { User } from '../models/user.model';

import { TeamStatus, NotFoundError, BadRequestError } from '@cuconnex/common';

const router = express.Router();

// a user request to join a team
router.post('/api/members/request', async (req: Request, res: Response, next: NextFunction) => {
  const { teamId, userId } = req.body;
  console.log(req.body);
  const user = await User.findOne({ where: { id: userId } });
  const team = await Team.findOne({ where: { teamId: teamId } });

  if (!user || !team) {
    throw new NotFoundError();
  }

  const member = await Member.findOne({ where: { userId, teamId } });
  // if there is a member status : 'accept || reject || pending ' do nothing
  if (member) {
    throw new BadRequestError('Already have status' + member.status);
    next();
  }

  Member.create({ userId, teamId, status: TeamStatus.Pending });
  res.status(201).send({ message: 'Request pending', user: user!.name, team: team!.teamName });
});

export { router as addMemberRouter };
