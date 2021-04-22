import { Request, Response, NextFunction } from 'express'
import { NotAuthorizedError } from '../errors/not-authorized-error';




export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        // throw new NotAuthorizedError()
        return res.status(401).send({
            errors: [{ message: "User not found in require Auth" }]
        })
    }

    next();
}