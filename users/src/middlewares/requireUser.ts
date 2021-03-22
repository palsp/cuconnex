import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '@cuconnex/common';

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new BadRequestError('Please fill the information form first.');
  }
  next();
};
