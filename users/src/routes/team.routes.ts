import { validateRequest } from '@cuconnex/common';
import express from 'express';
import * as teamController from '../controllers/team.controller';
import { requireUser } from '../middlewares';
import {
  createTeamValidator,
  addTeamMemberValidator,
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
  '/members/status',
  requireUser,
  manageTeamStatusValidator,
  validateRequest,
  teamController.manageStatus
);

router.get('/outgoingrequests/:name', requireUser, teamController.getOutGoingRequests);

export { router as teamRouter };
