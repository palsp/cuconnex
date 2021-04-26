import { validateRequest } from '@cuconnex/common';
import express from 'express';
import * as teamController from '../controllers/team.controller';
import { requireUser } from '../middlewares';
import {
  createTeamValidator,
  addTeamMemberValidator,
  requestToJoinTeamValidator,
  manageTeamStatusValidator,
} from '../utils/team.validators';

const router = express.Router();

router.get('/:name', teamController.getTeam);

router.get('/members/:name', requireUser, teamController.getTeamMember);

router.post('/', requireUser, createTeamValidator, validateRequest, teamController.createTeam);

router.post(
  '/members',
  requireUser,
  addTeamMemberValidator,
  validateRequest,
  teamController.addTeamMember
);

router.post(
  '/request-to-join',
  requireUser,
  requestToJoinTeamValidator,
  validateRequest,
  teamController.requetToJoinTeam
);

router.post(
  '/members/status',
  requireUser,
  manageTeamStatusValidator,
  validateRequest,
  teamController.manageStatus
);

router.get('/outgoingrequest/:name', requireUser, teamController.getOutGoingRequests);

export { router as teamRouter };
