import express, { Request, Response, NextFunction } from 'express';
import { Member } from '../models/member.model';
import { Team } from '../models/team.model';
import { User } from '../models/user.model';

import {
  TeamStatus,
  NotAuthorizedError,
  NotFoundError,
  BadRequestError,
  requireAuth
} from '@cuconnex/common';

const router = express.Router();

// a user request to join a team
router.post(
  '/api/members/request',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.currentUser!.id;

    if (!userId) {
      throw new NotAuthorizedError();
    }

    const teamName = req.body.name;

    const user = await User.findOne({ where: { id: userId } });
    const team = await Team.findOne({ where: { name: teamName } });

    if (!user) {
      throw new BadRequestError('User not found!');
    } else if (!team) {
      throw new BadRequestError('Team not found!');
    }

    const member = await Member.findOne({ where: { userId, teamName } });
    // if there is a member status : 'accept || reject || pending ' do nothing
    if (member) {
      throw new BadRequestError('This user already have status' + member.status);
    }

    Member.create({ userId, teamName, status: TeamStatus.Pending });
    res.status(201).send({ message: 'Request pending', user: user!.name, team: team!.name });
  }
);

// a team member can invite a user to join
router.post(
  '/api/members/invite',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
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

    const member = await Member.findOne({ where: { userId: newMemberId, teamName } });
    // if there is a member status : 'accept || reject || pending ' do nothing
    if (member) {
      throw new BadRequestError('This user already have status' + member.status);
    }

    Member.create({ userId: newMemberId, teamName, status: TeamStatus.Pending });
    res.status(201).send({ message: 'Invite pending', user: user!.name, team: team!.name });
  }
);
export { router as addMemberRouter };
