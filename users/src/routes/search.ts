import express, { Request, Response } from 'express';
import { requireAuth } from '@cuconnex/common';
import { User } from '../models/user.model';
import { Op } from 'sequelize';



const router = express.Router();



router.post('/api/users/:search', requireAuth, async (req: Request, res: Response) => {

    const users = await User.findAll({ where: { id: req.params.search, $or: [{ name: { [Op.like]: req.params.search } }] } });

    res.status(200).send({ lists: users });

});

export { router as searchRouter };