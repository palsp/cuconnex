import express, { Request, Response } from 'express'
import { User } from '../models/user.model';
import { Interest } from '../models/interest.model'
import { requireAuth } from '@cuconnex/common'


const router = express.Router();



router.get('/api/users', requireAuth, async (req: Request, res: Response) => {

    const id = req.currentUser!.id;

    const user = await User.findOne({ where: { id }, attributes: Object.keys(User.rawAttributes), include: { association: User.associations.interests, attributes: ["description"] } });

    if (!user) {
        res.redirect('/userInfo');
    }


    res.status(200).send(user);
});



export { router as getUserRouter };