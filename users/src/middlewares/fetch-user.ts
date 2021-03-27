import { NotAuthorizedError } from '@cuconnex/common';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: User | null;
    }
  }
}

export const fetchUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  try {
    const user = await User.findByPk(req.currentUser!.id);
    req.user = user;
  } catch (err) {}

  next();
};
