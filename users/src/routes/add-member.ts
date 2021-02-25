import express, { Request, Response, NextFunction } from 'express';
import { Member } from '../models/member.model';
import { Team } from '../models/team.model';
import { User } from '../models/user.model';

import { TeamStatus, NotAuthorizedError, NotFoundError, BadRequestError } from '@cuconnex/common';

const router = express.Router();

// a user request to join a team
router.post('/api/members/request', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.currentUser!.id;

    if (!userId) {
      throw new NotAuthorizedError();
    }

    const { teamName } = req.body;

    const user = await User.findOne({ where: { id: userId } });
    const team = await Team.findOne({ where: { name: teamName } });

    if (!user) {
      throw new BadRequestError('User not found!');
    } else if (!team) {
      throw new BadRequestError('Team not found!');
    }

    const member = await Member.findOne({ where: { teamName, userId } });

    // if there is a member status : 'accept || reject || pending ' do nothing
    if (member) {
      throw new BadRequestError('This user already have status: ' + member.status);
    }

    const newMember = await Member.create({ userId, teamName, status: TeamStatus.Pending });
    res.status(201).send({ message: 'Request pending', member: newMember });
  } catch (err) {
    // console.log('request failed.', err);
    next(err);
  }
});

// a team member can invite a user to join
router.post('/api/members/invite', async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.currentUser!.id;

  if (!userId) {
    throw new NotAuthorizedError();
  }

  const { teamName, newMemberId } = req.body;

  const user = await User.findOne({ where: { id: newMemberId } });
  const team = await Team.findOne({ where: { name: teamName } });

  if (!user) {
    throw new BadRequestError('User not found!');
  } else if (!team) {
    throw new BadRequestError('Team not found!');
  }

  const isInviterAMember = await Member.findOne({ where: { teamName, userId } });
  if (!isInviterAMember) {
    throw new BadRequestError('The inviter is not a team member.');
  } else if (isInviterAMember.status !== 'Accept') {
    throw new BadRequestError('The inviter is not yet a team member.');
  }

  const member = await Member.findOne({ where: { userId: newMemberId, teamName } });
  // if there is a member status : 'accept || reject || pending ' do nothing
  if (member) {
    throw new BadRequestError('This user already have status: ' + member.status);
  }

  await Member.create({ userId: newMemberId, teamName, status: TeamStatus.Pending });
  res.status(201).send({ message: 'Invite pending', user: user!.username, team: team!.name });
});
export { router as addMemberRouter };
