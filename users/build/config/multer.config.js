"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.storage = void 0;
const multer_1 = __importDefault(require("multer"));
const common_1 = require("@cuconnex/common");
//Storage config
exports.storage = multer_1.default.diskStorage({
    destination: 'assets',
    filename: function (req, file, cb) {
        // console.log(req.body);
        let extension = '.' + file.mimetype.split('/')[1];
        let fileName;
        fileName = req.currentUser.id + "_profile_pic";
        cb(null, fileName + extension);
    }
});
//Filters for only image files
const fileFilter = (req, file, cb) => {
    //Only accept files smaller than 1 GB, adjust file size (in bytes) here
    const max_size = 1000000000;
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" && file.size <= max_size) {
        cb(null, true);
    }
    else {
        if (max_size > 1000000000) {
            cb(new common_1.BadRequestError("Max file size exceeded!!!"), false);
        }
        else {
            cb(new common_1.BadRequestError("Image uploaded is not of type jpg/jpeg or png"), false);
        }
    }
};
exports.upload = multer_1.default({ storage: exports.storage, fileFilter: fileFilter });
