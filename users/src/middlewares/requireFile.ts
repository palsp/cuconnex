import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '@cuconnex/common';


export const requireFile = (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        throw new BadRequestError('Please include a file!!');
    }
    next();
};