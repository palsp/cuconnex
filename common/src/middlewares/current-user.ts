import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = async (req: Request, res: Response, next: NextFunction) => {
  // if (!req.session?.jwt) {
  //   return next();
  // }

  if (req.session?.jwt) {
    try {
      const decodedPayload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
      req.currentUser = decodedPayload;
    } catch (err) { }
  }

  // TODO: for development purpose only
  const authHeader = req.get('Authorization');
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decodedPayload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
      req.currentUser = decodedPayload;
    } catch (err) {
      console.log('bearer decode error', err.message);
    }
  }


  next();
};
