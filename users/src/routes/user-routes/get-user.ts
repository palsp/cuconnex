import express, { Request, Response } from 'express';
import { User } from '../../models/user.model';
import { NotFoundError } from '@cuconnex/common';
import { requireUser } from '../../middlewares';



const router = express.Router();


router.get('/api/users/view-profile/:userId', requireUser, async (req: Request, res: Response) => {


    const user = await User.findByPk(req.params.userId, { include: { association: User.associations.interests, attributes: ['description'] } })

    if (!user) {
        throw new NotFoundError();
    }

    const status = await user.findRelation(req.user!.id);


    return res.status(200).send({ id: user.id, username: user.username, interests: user.interests, status })


});

router.get('/api/users', async (req: Request, res: Response) => {

    if (!req.user) {
        return res.redirect('/userInfo');
    }

    const interests = await req.user.getInterests({ attributes: ['description'] });
    res.status(200).send({ id: req.user.id, username: req.user.username, interests });
});






export { router as getUserRouter };