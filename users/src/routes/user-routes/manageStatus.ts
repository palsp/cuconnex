import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { requireUser } from '../../middlewares/requireUser';
import { Member } from '../../models/member.model';

import { validateRequest, TeamStatus, requireAuth, BadRequestError } from '@cuconnex/common';
import { Team } from '../../models/team.model';

const router = express.Router();

const bodyChecker = [
  body('teamName').notEmpty().isAlphanumeric(),
  body('newStatusFromUser').notEmpty(),
];

router.post(
  '/api/users/invitation',
  requireUser,
  bodyChecker,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;
    const { teamName, newStatusFromUser } = req.body;

    try {
      const team = await Team.findOne({ where: { name: teamName } });

      if (!team) {
        throw new BadRequestError('Team not found');
      }

      const member = await Member.findOne({ where: { userId: user.id, teamName } });
      if (!member) {
        throw new BadRequestError(`User is not yet have a status with ${team.name} team.`);
      }

      const oldStatus = member.status;
      if (oldStatus !== TeamStatus.Pending) {
        throw new BadRequestError('This user has no pending status with this team.');
      }

      if (newStatusFromUser === TeamStatus.Pending) {
        throw new BadRequestError('New status from the user should be Accepted or Rejected.');
      }

      member.status = newStatusFromUser;
      const check = await member.save();

      res
        .status(200)
        .send({ message: `Invitation from ${team.name} to ${user.name} is ${newStatusFromUser}.` });
    } catch (err) {
      next(err);
    }
  }
);

export { router as manageStatusRouter };
