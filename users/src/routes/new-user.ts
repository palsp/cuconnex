import express, { Request, Response } from 'express';
import { body } from 'express-validator'
import { InterestDescription, validateRequest } from '@cuconnex/common'
import { User } from '../models/user.model';
import { NotAuthorizedError, BadRequestError, requireAuth } from '@cuconnex/common'




const router = express.Router();



const bodyChecker = [body('interests')
    .not()
    .isEmpty()
    .isArray()
    .custom((input: string[]) => {
        // find first element in the input array that does not has
        // value specify in InterestDescription
        const result = input.find(int => !(Object.values(InterestDescription) as string[]).includes(int))
        // expect result to be undefined so the process continue
        return result === undefined;
    })
    .withMessage('Valid interest must be provided'),
body('name')
    .notEmpty()
    .withMessage('User name must be supplied')
];

// create user for first time login
router.post('/api/users', bodyChecker, validateRequest, async (req: Request, res: Response) => {
    const { interests, name } = req.body

    // Make sure that user does not exist
    let user = await User.findOne({ where: { sid: req.currentUser!.sid } });
    if (user) {
        throw new BadRequestError('User already existed');
    }

    // remove duplicate interests from an array of interests
    const uniqueInterests = Array.from(new Set<InterestDescription>(interests)).map(description => ({ description }));

    let createSuccess;
    try {
        user = await User.create({ sid: req.currentUser!.sid, name });
        await user.createInterestsFromArray(uniqueInterests);
        createSuccess = true;

    } catch (err) {
        createSuccess = false;

    }


    // if something went wrong clear all user information in database
    // user need to retry from the beginning!!
    if (!createSuccess && user) {
        await user.destroy();
        throw new Error('Something went wrong');
    }

    res.status(201).send({ sid: user!.sid, username: user!.name });
});


export { router as newUserRouter };

