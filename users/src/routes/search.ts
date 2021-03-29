import express, { Request, Response } from 'express';
import { User } from '../models/user.model';
import { Team } from '../models/team.model';
import { Op } from 'sequelize';
import { requireUser } from '../middlewares';

const router = express.Router();

const MAX_SEARCH = 11;

router.get('/api/users/:search', requireUser, async (req: Request, res: Response) => {
  const constraints = [{ name: { [Op.startsWith]: req.params.search } }, { id: req.params.search }];
  let users = await User.findAll({
    where: {
      [Op.or]: constraints
    },
    include: { association: 'interests', attributes: ['description'] }
  });

  if (users.length > MAX_SEARCH) {
    users = users.slice(0, MAX_SEARCH);
  }
  // sort by length from min > max
  users.sort((a: User, b: User) => a.name.length - b.name.length);

  // send back only name interest and ...
  res.status(200).send(users);
});

router.get('/api/teams/:search', async (req: Request, res: Response) => {
  let teams = await Team.findAll({
    where: { name: { [Op.startsWith]: req.params.search } }
  });

  if (teams.length > MAX_SEARCH) {
    teams = teams.slice(0, MAX_SEARCH);
  }
  // sort by length from min > max
  teams.sort((a: Team, b: Team) => a.name.length - b.name.length);

  res.status(200).send(teams);
});

export { router as searchRouter };
