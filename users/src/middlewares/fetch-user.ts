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
/** 
 * A middleware function used to fetch user data from mySQL.
 * 
 * First checks if the request object's currentUser field is defined.
 * If so then fetch the user's information from the database and stores it in req.user
 * @throws {NotAuthorizedError} if the req.currentUser does not exist or is otherwise undefined
 * 
 */
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
