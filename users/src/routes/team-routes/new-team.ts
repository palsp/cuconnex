import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { requireUser } from '../../middlewares/requireUser';
import { TeamStatus } from '@cuconnex/common';
import { Team } from '../../models/team.model';
import { User } from '../../models/user.model';
import { Member } from '../../models/member.model';
import { NotAuthorizedError, BadRequestError, validateRequest } from '@cuconnex/common';

const router = express.Router();

const bodyChecker = [
  body('name')
    .notEmpty()
    .isAlphanumeric()
];

// when user try to create a team
router.post(
  '/api/teams',
  bodyChecker,
  validateRequest,
  requireUser,
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;
    const user = req.user!;

    try {
      const team = await Team.findOne({ where: { name } });
      if (team) {
        throw new BadRequestError('Team name already existed.');
      }

      const newTeam = await user.createTeams({ name, description });
      const status = await Member.create({
        userId: user.id,
        teamName: name,
        status: TeamStatus.Accept
      });

      res.status(201).send({
        message: `Create team successfully by ${user.id}.`,
        creatorId: user.id,
        name: newTeam!.name,
        status
      });
    } catch (err) {
      next(err);
      // throw new Error(err.message);
    }
  }
);

export { router as newTeamRouter };
