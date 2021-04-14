import { Request, Response, NextFunction } from 'express';


export const someMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // do something........
}