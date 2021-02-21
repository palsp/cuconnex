import express, { Request, Response } from 'express';
import { Member } from '../models/member.model';
import { User } from '../models/user.model';

import { requireAuth, NotFoundError, BadRequestError } from '@cuconnex/common';

const router = express.Router();

router.get('/mem', async (req: Request, res: Response) => {
  const { teamId } = req.body;

  // const users = await Member.findAll({
  //   where: { teamId },
  //   include: { association: User.associations.interests, attributes: ['description'] }
  // });

  const users = await Member.findAll({ where: { teamId } });

  res.status(200).send({ users });
});

router.get('/api/members', async (req: Request, res: Response) => {
  // const id = req.currentUser!.id;
  const { userId, teamId } = req.body;

  const memberStatus = await Member.findOne({ where: { userId, teamId } });

  if (!memberStatus) {
    throw new BadRequestError('No relation between the user and the team yet');
  }
  res.status(200).send({ status: memberStatus.status });
});

// change isMember status
router.post('/api/members', async (req: Request, res: Response) => {
  const { userId, teamId, status } = req.body;

  const member = await Member.findOne({ where: { userId, teamId } });

  if (member) {
    member.status = status;
    member.save();
  } else {
    Member.create({ userId, teamId, status });
  }

  res.status(200).send({ message: `Change member status to ${status}`, userId, teamId });
});

export { router as memberRouter };
