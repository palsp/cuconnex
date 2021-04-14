import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '@cuconnex/common';
import { User } from '../../models';
import { requireUser } from '../../middlewares';
import { addFreindResultValidator, addFriendValidator } from '../../utils/validators';

const router = express.Router();


/**
 * add friend
 */
router.post(
  '/api/users/add-friend',
  requireUser,
  addFriendValidator,
  validateRequest,
  async (req: Request, res: Response) => {
    const addedUser = await User.findUser(req.body.userId);

    await req.user!.requestConnection(addedUser);

    res.status(201).send({});
  }
);

/**
 * accepted or rejected friend request
 */
router.post(
  '/api/users/add-friend/result',
  requireUser,
  addFreindResultValidator,
  validateRequest,
  async (req: Request, res: Response) => {
    const sendUser = await User.findUser(req.body.userId);

    const status = await req.user!.acceptConnection(sendUser.id, req.body.accepted);

    res.status(201).send({ status });
  }
);

export { router as addFriendRouter };
