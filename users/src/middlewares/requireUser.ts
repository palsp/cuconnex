import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '@cuconnex/common';

/**
 * Checks for you if there is a req.user already
 * So if you call this middleware and it does not throws an error, then you can be 100% sure
 * that there is a user property on the req objects
 * @throws {BadRequestError} - If the req object does not have user attached to it
 *  
 */
export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new BadRequestError('Please fill the information form first.');
  }
  next();
};
