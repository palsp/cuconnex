import express, { Request, Response } from 'express'
import { User } from '../models/user.model';
import { requireAuth } from '@cuconnex/common'


const router = express.Router();



router.get('/api/users', requireAuth, async (req: Request, res: Response) => {

    const id = req.currentUser!.id;

    const user = await User.findOne({ where: { id } });

    if (!user) {
        res.redirect('/userInfo');
    }

    res.status(200).send(user);
});



export { router as getUserRouter };