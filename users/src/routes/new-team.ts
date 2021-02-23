import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validateRequest, NotFoundError } from '@cuconnex/common';
import { Team } from '../models/team.model';
import { User } from '../models/user.model';
import { NotAuthorizedError, BadRequestError, requireAuth } from '@cuconnex/common';

const router = express.Router();

// when user try to create a team
router.post('/api/teams', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
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

    const eiei = await user.createTeams({ name });
    console.log('check eiei ', eiei);

    // if something went wrong clear all team information in database
    // user need to retry from the beginning!!

    res.status(201).send({
      message: `Create team succesfully by ${userId}.`,
      userId,
      name: team!.name
    });
  } catch (err) {
    console.log('create failed', err);
    next(err);
  }
});

export { router as newTeamRouter };
