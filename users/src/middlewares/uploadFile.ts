import { NotAuthorizedError } from '@cuconnex/common';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { User } from '../models/user.model';


export const uploadFileWithName = (name: string) => {
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: (req, file, cb) => {
            cb(null, 'assets');
        },
        filename: (req, file, cb) => {
            let extension = '.' + file.mimetype.split('/')[1];
            cb(null, name + '_profile_pic'+extension);
        }
    });

    var upload = multer({ //multer settings
        storage: storage
    })

    return upload.single('myFile');
};