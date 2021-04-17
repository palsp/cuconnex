import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { NotAuthorizedError, BadRequestError } from '@cuconnex/common';
import { User } from '../models';

declare global {
    namespace Express {
        interface Request {
            user?: User | null;
        }
    }
}

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

/** 
 * A middleware function used to fetch user data from MySQL.
 * 
 * First checks if the request object's `currentUser` field is defined.
 * If so then fetch the user's information from the database and stores it in `req.user`
 * @throws {NotAuthorizedError} if `req.currentUser` does not exist or is otherwise undefined
 * 
 */
export const fetchUser = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        throw new NotAuthorizedError();
    }

    try {
        const user = await User.findByPk(req.currentUser!.id);
        req.user = user;
    } catch (err) { }

    next();
};


export const requireFile = (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        throw new BadRequestError('Please include a file!!');
    }
    next();
};

/**
 * Checks for you if there is a req.user already.
 * 
 * So if you call this middleware and it does not throw an error, then you can be 100% sure
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


/**
 * this will enable multipart form on the request
 * @param name 
 * @returns 
 */
export const uploadFileWithName = (name: string) => {
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: (req, file, cb) => {
            cb(null, 'assets');
        },
        filename: (req, file, cb) => {
            let extension = '.' + file.mimetype.split('/')[1];
            cb(null, name + '_profile_pic' + extension);
        }
    });

    var upload = multer({ //multer settings
        storage: storage
    })

    return upload.single('image');
};