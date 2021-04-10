"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileWithName = void 0;
const multer_1 = __importDefault(require("multer"));
const uploadFileWithName = (name) => {
    var storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'assets');
        },
        filename: (req, file, cb) => {
            let extension = '.' + file.mimetype.split('/')[1];
            cb(null, name + '_profile_pic' + extension);
        }
    });
    var upload = multer_1.default({
        storage: storage
    });
    return upload.single('myFile');
};
exports.uploadFileWithName = uploadFileWithName;
