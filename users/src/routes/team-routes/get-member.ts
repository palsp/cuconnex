import express, { Request, Response, NextFunction } from 'express';
import { Team, Member } from '../../models';

import { BadRequestError, validateRequest } from '@cuconnex/common';
import { body } from 'express-validator';

const router = express.Router();

const bodyChecker = [
  body('teamName')
    .notEmpty()
    .isAlphanumeric()
];

// ดูรายชื่อคนในทีม
// get user(s) with member status of the team
router.get(
  '/api/members',
  bodyChecker,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

export { router as getMemberRouter };
