import multer from 'multer';
import { BadRequestError } from '@cuconnex/common';

//Storage config
export const storage = multer.diskStorage({
    destination: 'assets',
    filename: function (req, file, cb) {
        console.log(req.body);
        let extension = '.'+ file.mimetype.split('/')[1];
        let fileName;
        if(req.body.name){
            fileName = req.body.name + "_profile_pic";
        } else {
            fileName = "Unknown_profile_pic";
        }
        cb(null, fileName + extension)
    }
})

//Filters for only image files
const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {

        cb(null, true);
    } else {
        cb(new BadRequestError("Image uploaded is not of type jpg/jpeg or png"),false);
    }
}


export const upload = multer({ storage: storage, fileFilter: fileFilter });

