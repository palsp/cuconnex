import multer from 'multer';
import { BadRequestError } from '@cuconnex/common';

const MAX_FILE_SIZE_IN_BYTES = 1000000000;

//Storage config
export const storage = multer.diskStorage({
    destination: './assets',
    filename: function (req, file, cb) {
        // console.log(req.body);
        let extension = '.' + file.mimetype.split('/')[1];
        let fileName;

        fileName = req.currentUser!.id + "_profile_pic_" + (Date.now()).toString();

        cb(null, fileName + extension)
    }
})

//Filters for only image files
const fileFilter = (req: any, file: any, cb: any) => {
    //Only accept files smaller than 1 GB, adjust file size (in bytes) here
    if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);

    } else {
        cb(new BadRequestError("Image uploaded is not of type jpg/jpeg or png"), false);
    }
}

// var limits = { fileSize: 1024 * 1024 * 1024 }
export const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 1 * MAX_FILE_SIZE_IN_BYTES } });

