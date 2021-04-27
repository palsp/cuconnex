import { validateRequest } from '@cuconnex/common';
import express from 'express';
import { upload } from '../config/multer.config';
import * as userController from '../controllers/user.controller';
import { requireUser, transformRequest } from '../middlewares';
import {
  requestToJoinTeamValidator,
  postUserValidator,
  manageUserStatusValidator,
} from '../utils/user.validators';

const router = express.Router();

router.get('/current-user', userController.getUser);

router.get('/relation/:userId', requireUser, userController.findRelation);

router.get('/:userId', requireUser, userController.viewUserProfile);

router.get('/', userController.search);

router.post(
  '/',
  upload.single('image'),
  transformRequest,
  postUserValidator,
  validateRequest,
  userController.createUser
);

router.get('/notification/invite', requireUser, validateRequest, userController.getInvitationNoti);

router.get('/teams/:userId', requireUser, userController.getListofTeamsBelongsTo);

router.post(
  '/status/invitation',
  requireUser,
  manageUserStatusValidator,
  validateRequest,
  userController.manageStatus
);

router.post(
  '/request-to-join',
  requireUser,
  requestToJoinTeamValidator,
  validateRequest,
  userController.requetToJoinTeam
);

export { router as userRouter };
