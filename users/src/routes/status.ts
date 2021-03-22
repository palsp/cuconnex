import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { Member } from '../models/member.model';
import { User } from '../models/user.model';
import { Team } from '../models/team.model';
import { requireUser } from '../middlewares/requireUser';
import { validateRequest, BadRequestError } from '@cuconnex/common';

const router = express.Router();
const bodyChecker = [
  body('targetUserId')
    .notEmpty()
    .isAlphanumeric(),
  body('teamName')
    .notEmpty()
    .isAlphanumeric(),
  body('status').notEmpty()
];

// change status to approve / reject by creator of the team
router.post(
  '/api/members/status',
  bodyChecker,
  validateRequest,
  requireUser,
  async (req: Request, res: Response, next: NextFunction) => {
    const creatorId = req.user!.id;
    const { targetUserId, teamName, status } = req.body;

    const team = await Team.findOne({ where: { name: teamName } });
    const user = await User.findOne({ where: { id: targetUserId } });
    if (!team) {
      throw new BadRequestError('Team not found!');
    } else if (!user) {
      throw new BadRequestError('User not found!');
    } else if (team.userId !== creatorId) {
      throw new BadRequestError('You are not the team creator!');
    }

    const member = await Member.findOne({ where: { teamName, userId: targetUserId } });
    if (!member) {
      throw new BadRequestError(`Status for ${targetUserId} and ${teamName} not found!`);
    }

    const oldStatus = member.status;
    member.status = status;
    member.save();

    res
      .status(200)
      .send({ message: `Change status of ${targetUserId} from ${oldStatus} to ${status}` });
  }
);

export { router as memberStatusRouter };
