import { validateRequest } from '@cuconnex/common';
import express from 'express'
import { upload } from '../config/multer.config';
import * as teamController from '../controllers/team.controller';
import { requireUser, transformRequest } from '../middlewares';
import { createTeamValidator, addTeamMemberValidator, requestToJoinTeamValidator } from '../utils/team.validators';


const router = express.Router();

router.get("/:name", teamController.getTeam);

router.post("/", requireUser, createTeamValidator, validateRequest, teamController.createTeam);

router.get("/members/:name", requireUser, teamController.getTeamMember);

router.post("/members", requireUser, addTeamMemberValidator, validateRequest, teamController.addTeamMember);

router.post("/request-to-join", requireUser, requestToJoinTeamValidator, validateRequest, teamController.requetToJoinTeam);


export { router as teamRouter };





