import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { requireUser } from '../../middlewares/requireUser';
import { Member } from '../../models/member.model';
import { Team } from '../../models/team.model';
import { User } from '../../models/user.model';

import { validateRequest, TeamStatus, NotAuthorizedError, BadRequestError } from '@cuconnex/common';

const router = express.Router();

const bodyChecker1 = [
  body('teamName')
    .notEmpty()
    .isAlphanumeric()
];

// a user request to join a team
router.post(
  '/api/members/request',
  requireUser,
  bodyChecker1,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user!;
      console.log(user);

      const { teamName } = req.body;

      const team = await Team.findOne({ where: { name: teamName } });

      if (!team) {
        throw new BadRequestError('Team not found!');
      }

      const member = await Member.findOne({ where: { teamName, userId: user.id } });

      // if there is a member status : 'accept || reject || pending ' do nothing
      if (member) {
        throw new BadRequestError('This user already have status: ' + member.status);
      }

      const newMember = await Member.create({
        userId: user.id,
        teamName,
        status: TeamStatus.Pending
      });

      res.status(201).send({ message: 'Request pending', member: newMember });
    } catch (err) {
      next(err);
    }
  }
);
const bodyChecker2 = [
  body('teamName')
    .notEmpty()
    .isAlphanumeric(),
  body('newMemberId')
    .notEmpty()
    .isAlphanumeric()
];

// a team member can invite a user to join
router.post(
  '/api/members/invite',
  requireUser,
  bodyChecker2,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const sender = req.user!;

    const { teamName, newMemberId } = req.body;

    const receiver = await User.findOne({ where: { id: newMemberId } });
    const team = await Team.findOne({ where: { name: teamName } });

    if (!receiver) {
      throw new BadRequestError('User not found!');

      // else if มี receiver แต่ receiver not yet fill info.
    } else if (!team) {
      throw new BadRequestError('Team not found!');
    }

    const isInviterAMember = await Member.findOne({ where: { teamName, userId: sender.id } });
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
    res.status(201).send({ message: 'Invite pending', userId: receiver!.id, team: team!.name });
  }
);
export { router as addMemberRouter };
