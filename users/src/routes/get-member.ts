import express, { Request, Response, NextFunction } from 'express';
import { Member } from '../models/member.model';
import { Team } from '../models/team.model';

import { BadRequestError } from '@cuconnex/common';

const router = express.Router();

// ดูรายชื่อคนในทีม
// get user(s) with member status of the team
router.get('/api/members', async (req: Request, res: Response, next: NextFunction) => {
  const { teamName } = req.body;

  const team = await Team.findOne({ where: { name: teamName } });
  if (!team) {
    throw new BadRequestError('Team not found!');
  }

  const members = await Member.findAll({ where: { teamName } });

  let returnMembers: any = [];
  if (members) {
    returnMembers = members;
  }

  res.status(200).send({ message: `Getting members of ${teamName}`, members: returnMembers });
});

export { router as getMemberRouter };
