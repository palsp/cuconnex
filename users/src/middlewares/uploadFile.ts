import { NotAuthorizedError } from '@cuconnex/common';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';


export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.file)

    next();
};