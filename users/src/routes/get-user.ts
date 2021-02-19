import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { validateRequest } from '@cuconnex/common'
import { User } from '../models/user.model';



const router = express.Router();



router.get('/api/users', validateRequest, async (req, res) => {

    const id = req.currentUser!.id;

    const user = await User.findOne({ where: { id } });

    if (!user) {
        res.redirect('/userInfo');
    }

    res.status(200).send(user);
});



