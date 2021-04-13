import express, { Request, Response } from 'express';
import { requireUser } from '../../middlewares';
import { UserInterest } from '../../models/';

const router = express.Router();

router.get('/api/users/view-profile/:userId', requireUser, async (req: Request, res: Response) => {

  const interests = await UserInterest.findAll({ where: { userId: req.user!.id } });

  const status = await req.user!.findRelation(req.user!.id);

  return res.status(200).send({ id: req.user!.id, name: req.user!.name, interests, status });
});


router.get('/api/users', async (req: Request, res: Response) => {
  if (!req.user) {
    return res.redirect('/userInfo');
  }

  const interests = await req.user.getInterests({ attributes: ['description'] });
  res.status(200).send({ id: req.user.id, name: req.user.name, interests });
});

export { router as getUserRouter };
