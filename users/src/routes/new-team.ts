import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { TeamStatus } from '@cuconnex/common';
import { validateRequest, NotFoundError } from '@cuconnex/common';
import { Team } from '../models/team.model';
import { User } from '../models/user.model';
import { Member } from '../models/member.model';
import { NotAuthorizedError, BadRequestError, requireAuth } from '@cuconnex/common';

const router = express.Router();

// when user try to create a team
router.post('/api/teams', async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const userId = req.currentUser!.id;
  if (!userId) {
    throw new NotAuthorizedError();
  }

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestError('User not found!');
    }

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
      message: `Create team successfully by ${userId}.`,
      userId,
      name: newTeam!.name,
      status
    });
  } catch (err) {
    next(err);
  }
});

export { router as newTeamRouter };
