import express, { Request, Response } from 'express';
import { body } from 'express-validator'
import { InterestDescription } from '@cuconnex/common'


const router = express.Router();



const bodyChecker = [body('interests')
    .not()
    .isEmpty()
    .isArray()
    .custom((input: string[]) => {
        const result = input.find(int => !(Object.values(InterestDescription) as string[]).includes(int))
        return result === null;
    })];

// create user for first time login
router.post('/api/users', async (req: Request, res: Response) => {

});


export { router as newUserRouter };

