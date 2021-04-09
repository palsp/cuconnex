import multer from 'multer';
import { BadRequestError } from '@cuconnex/common';

//Storage config
export const storage = multer.diskStorage({
    destination: 'assets',
    filename: function (req, file, cb) {
        // console.log(req.body);
        let extension = '.' + file.mimetype.split('/')[1];
        let fileName;

        fileName = req.currentUser!.id + "_profile_pic";

        cb(null, fileName + extension)
    }
})

//Filters for only image files
const fileFilter = (req: any, file: any, cb: any) => {
    //Only accept files smaller than 1 GB, adjust file size (in bytes) here
    const max_size = 1000000000;
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" && file.size <= max_size) {

        cb(null, true);


    } else {
        if (max_size > 1000000000) {
            cb(new BadRequestError("Max file size exceeded!!!"), false);
        } else {
            cb(new BadRequestError("Image uploaded is not of type jpg/jpeg or png"), false);
        }

    }
}


export const upload = multer({ storage: storage, fileFilter: fileFilter });

