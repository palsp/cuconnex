import express, { Request, Response } from 'express';
import { User } from '../models/user.model';
import { Op } from 'sequelize';
import { NotFoundError } from '@cuconnex/common';
import { requireUser } from '../middlewares/requireUser';
import { Friend } from '../models/friend.model';
import { Interest } from '../models/interest.model';
import { where } from 'sequelize';


const router = express.Router();


router.get('/api/users/view-profile/:sid', requireUser, async (req: Request, res: Response) => {


    const user = await User.findByPk(req.params.sid, { include: { association: User.associations.interests, attributes: ['description'] } })

    if (!user) {
        throw new NotFoundError();
    }

    const status = await user.findRelation(req.user!.sid);


    return res.status(200).send({ sid: user.sid, name: user.name, interests: user.interests, status })


});

router.get('/api/users', async (req: Request, res: Response) => {

    if (!req.user) {
        return res.redirect('/userInfo');
    }

    const interests = await req.user.getInterests({ attributes: ['description'] });
    res.status(200).send({ id: req.user.sid, name: req.user.name, interests });
});






export { router as getUserRouter };