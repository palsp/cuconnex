import { validateRequest } from '@cuconnex/common';
import express from 'express';
import * as teamController from '../controllers/team.controller';
import { requireUser } from '../middlewares';
import {
  createTeamValidator,
  addTeamMemberValidator,
  manageTeamStatusValidator,
  registerEventValidator,
} from '../utils/team.validators';

const router = express.Router();

router.get('/:name', teamController.getTeam);

router.get('/members/:name', requireUser, teamController.getTeamMember);

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

router.post('/', requireUser, createTeamValidator, validateRequest, teamController.createTeam);

router.get('/outgoing-requests/:name', requireUser, teamController.getOutgoingRequests);

router.get('/incoming-requests/:name', requireUser, teamController.getIncomingRequests);

export { router as teamRouter };
