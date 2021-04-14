import { validateRequest } from '@cuconnex/common';
import express from 'express'
import { upload } from '../config/multer.config';
import * as userController from '../controllers/user.controller';
import { requireUser, transformRequest } from '../middlewares';
import { postUserValidator } from '../utils/validators';


const router = express.Router();


router.get("/", userController.getUser)

router.get("/view-profile/:userId", requireUser, userController.viewUserProfile);

router.post("/", upload.single('myFile'), transformRequest, postUserValidator, validateRequest, userController.createUser);


export { router as userRouter };





