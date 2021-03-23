import express, { Request, Response } from 'express';
import { User } from '../../models/user.model';
import { NotFoundError } from '@cuconnex/common';
import { requireUser } from '../../middlewares';
import { UserInterest } from '../../models/UserInterest.model';

const router = express.Router();

router.get('/api/users/view-profile/:userId', requireUser, async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.userId);

  if (!user) {
    throw new NotFoundError();
  }
  const interests = await UserInterest.findAll({ where: { userId: user.id } });
  if (!interests) {
    console.log(interests);
  }

  const status = await user.findRelation(req.user!.id);

  return res.status(200).send({ id: user.id, name: user.name, interests, status });
});

router.get('/api/users', async (req: Request, res: Response) => {
  if (!req.user) {
    return res.redirect('/userInfo');
  }

  const interests = await req.user.getInterests({ attributes: ['description'] });
  res.status(200).send({ id: req.user.id, name: req.user.name, interests });
});

export { router as getUserRouter };
