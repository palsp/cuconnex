import express, { Request, Response } from 'express';
import { User } from '../models/user.model';
import { Op } from 'sequelize';
import { requireUser } from '../middlewares/requireUser';
import { Interest } from '../models/interest.model';



const router = express.Router();


const MAX_SEARCH = 11;




router.get('/api/users/:search', requireUser, async (req: Request, res: Response) => {

    let users = await User.findAll({ where: { [Op.or]: [{ username: { [Op.startsWith]: req.params.search } }, { id: req.params.search }] }, include: { association: User.associations.interests, attributes: ['description'] } });

    if (users.length > MAX_SEARCH) {
        users = users.slice(0, MAX_SEARCH);
    }
    // sort by length from min > max
    users.sort((a: User, b: User) => a.username.length - b.username.length)

    // send back only name interest and ...
    res.status(200).send(users);

});

export { router as searchRouter };