import express, { Request, Response } from 'express';
import { body } from 'express-validator'
import { validateRequest, FriendStatus } from '@cuconnex/common';
import { User } from '../models/user.model';
import { requireUser } from '../middlewares/requireUser';
import { Friend } from '../models/friend.model';



const router = express.Router();

const bodyChecker = [
    body('userId')
        .notEmpty()
        .isAlphanumeric()
];

router.post('/api/users/add-friend', requireUser, bodyChecker, validateRequest, async (req: Request, res: Response) => {


    const addedUser = await User.findUser(req.body.userId)

    await req.user!.addUserAsFriend(addedUser);

    res.status(201).send({});

});




router.post('/api/users/add-friend/result', requireUser, [
    body('userId')
        .notEmpty()
        .isAlphanumeric()
        .withMessage('User id is not valid'),
    body('accepted')
        .notEmpty()
        .isBoolean()
], validateRequest, async (req: Request, res: Response) => {
    const sendUser = await User.findUser(req.body.userId);

    const status = await req.user!.acceptFriendRequest(sendUser.id, req.body.accepted);


    res.status(201).send({ status });

});


export { router as addFriendRouter }