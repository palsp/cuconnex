import { Request, Response, NextFunction } from 'express';

/**
 * Transform multipartvalue into normal json format 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
export const transformRequest = async (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.body!.interests && typeof req.body.interests === 'string') {
        req.body.interests = JSON.parse(req.body.interests);
    }
    next();
}