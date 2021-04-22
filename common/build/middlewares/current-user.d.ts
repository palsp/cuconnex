import { Request, Response, NextFunction } from 'express';
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
export declare const currentUser: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
