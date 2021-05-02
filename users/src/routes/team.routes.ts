import { validateRequest } from '@cuconnex/common';
import express from 'express';
import { teamUpload, upload } from '../config/multer.config';

import * as teamController from '../controllers/team.controller';
import { requireUser, transformTeamRequest } from '../middlewares';
import {
  createTeamValidator,
  editTeamValidator,
  addTeamMemberValidator,
  manageTeamStatusValidator,
  registerEventValidator,
} from '../utils/team.validators';

const router = express.Router();

router.get('/events/:teamName', teamController.getRegisteredEvents);

router.get('/recommend-user/:teamName' , requireUser , teamController.getRecommendedUserForTeam);

router.get('/:name', teamController.getTeam);

router.get('/members/:name', requireUser, teamController.getTeamMember);


router.get('/');

router.post(
  '/events/register',
  requireUser,
  registerEventValidator,
  validateRequest,
  teamController.registerEvent
);

router.post(
  '/invite-member',
  requireUser,
  addTeamMemberValidator,
  validateRequest,
  teamController.inviteMember
);

router.post(
  '/members/status',
  requireUser,
  manageTeamStatusValidator,
  validateRequest,
  teamController.manageStatus
);

router.post(
  '/',
  requireUser,
  teamUpload.single('image'),
  transformTeamRequest,
  createTeamValidator,
  validateRequest,
  teamController.createTeam
);

router.put(
  '/',
  requireUser,
  teamUpload.single('image'),
  transformTeamRequest,
  editTeamValidator,
  validateRequest,
  teamController.editTeam
);

router.get('/outgoing-requests/:name', requireUser, teamController.getOutgoingRequests);

router.get('/incoming-requests/:name', requireUser, teamController.getIncomingRequests);

export { router as teamRouter };
