import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { Team } from '../models/team.model';
import { User } from '../models/user.model';
import { Member } from '../models/member.model';
import { TeamStatus, NotAuthorizedError, BadRequestError } from '@cuconnex/common';
import { requireUser } from '../middlewares/requireUser';

const router = express.Router();

// when user try to create a team
router.post('/api/teams', requireUser, async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const user = req.user!;

  try {
    const team = await Team.findOne({ where: { name } });
    if (team) {
      throw new BadRequestError('Team name already existed.');
    }

    const newTeam = await user.createTeams({ name: name });
    const status = await Member.create({
      userId: user.id,
      teamName: name,
      status: TeamStatus.Accept
    });

    res.status(201).send({
      message: `Create team successfully by ${user.id}.`,
      userId: user.id,
      name: newTeam!.name,
      status
    });
  } catch (err) {
    next(err);
  }
});

export { router as newTeamRouter };
