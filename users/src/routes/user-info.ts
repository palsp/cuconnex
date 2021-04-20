import express, { Request, Response } from 'express';

import { User, Member } from '../models';

import { NotFoundError, validateRequest, TeamStatus } from '@cuconnex/common';

const router = express.Router();

/**
 * เอาไว้ทำอิหยัง
 */
router.get('/api/members/:id', async (req: Request, res: Response) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  if (!user) {
    throw new NotFoundError();
  }

  const members = await Member.findAll({ where: { userId: user.id } });

  let returnTeams: any = [];
  if (members) {
    members.filter((member) => {
      if (member.status === TeamStatus.Accept) {
        returnTeams.push(member.teamName);
      }
    });
  }

  res.status(200).send({ teams: returnTeams });
});

export { router as userInfoRouter };
