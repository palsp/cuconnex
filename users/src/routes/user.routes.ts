import { validateRequest } from '@cuconnex/common';
import express from 'express';
import { upload } from '../config/multer.config';
import * as userController from '../controllers/user.controller';
import { requireUser, transformRequest } from '../middlewares';
import { User } from '../models';
import {
  requestToJoinTeamValidator,
  postUserValidator,
  manageUserStatusValidator,
  editUserValidator,
  addRatingValidator,
} from '../utils/user.validators';

const router = express.Router();

router.get('/notification/invite', requireUser, validateRequest, userController.getInvitationNoti);

router.get('/teams/:userId', requireUser, userController.getListofTeamsBelongsTo);

router.get('/get-my-requests', requireUser, userController.getMyRequests);

router.get('/current-user', userController.getUser);

router.get('/rate' , requireUser , userController.getRateUser);

router.get('/relation/:userId', requireUser, userController.findRelation);

router.get('/status/:teamName', requireUser, userController.getTeamStatus);

router.put(
  '/',
  requireUser,
  upload.single('image'),
  transformRequest,
  editUserValidator,
  validateRequest,
  requireUser,
  userController.editUser
);


router.get('/recommend-team/:eventId' , requireUser , userController.getRecommendTeam);

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
  userController.requestToJoinTeam
);

router.post(
  '/rate',
  requireUser,
  addRatingValidator,
  validateRequest,
  userController.addRatings

);

export { router as userRouter };
