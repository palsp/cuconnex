import { validateRequest } from '@cuconnex/common';
import express from 'express'
import * as teamController from '../controllers/team.controller';
import { requireUser } from '../middlewares';
import { createTeamValidator, addTeamMemberValidator, requestToJoinTeamValidator } from '../utils/team.validators';


const router = express.Router();



router.get("/:name", teamController.getTeam);

router.get("/members/:name", requireUser, teamController.getTeamMember);

router.post("/", requireUser, createTeamValidator, validateRequest, teamController.createTeam);

router.post("/members", requireUser, addTeamMemberValidator, validateRequest, teamController.addTeamMember);

router.post("/request-to-join", requireUser, requestToJoinTeamValidator, validateRequest, teamController.requetToJoinTeam);




export { router as teamRouter };




