import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error'
import jwt from 'jsonwebtoken';


interface UserPayload {
    id: string;
    username: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}


export const currentUser = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.session?.jwt) {
        return next();
    }

    try {
        const decodedPayload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = decodedPayload;

    } catch (err) {

    }

    next();
};