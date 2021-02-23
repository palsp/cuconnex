import express, { Request, Response, NextFunction } from 'express';
import { Member } from '../models/member.model';
import { User } from '../models/user.model';
import { Team } from '../models/team.model';

import { requireAuth, NotFoundError, BadRequestError } from '@cuconnex/common';

const router = express.Router();

// ดูรายชื่อคนในทีม
// get user(s) with member status of the team
router.get('/api/members', async (req: Request, res: Response, next: NextFunction) => {
  const { teamName, status } = req.body;

  const team = await Team.findOne({ where: { name: teamName } });
  if (!team) {
    throw new BadRequestError('Team not found!');
  }

  const members = await Member.findAll({ where: { teamName } });
  if (!members) {
    throw new BadRequestError(`No member in this team ${teamName}`);
  }

  console.log('members', members);

  console.log('eiie come here', req.body);
  // TODO
  // return with specific status
  // if(status === 'Pending' ) {}

  res.status(200).send({ message: `Getting members of ${teamName}`, members: members });
});

export { router as getMemberRouter };
