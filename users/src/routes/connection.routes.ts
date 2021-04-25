import { validateRequest } from '@cuconnex/common';
import express from 'express'
import * as connectionController from '../controllers/connection.controller';
import { requireUser } from '../middlewares';
import { addFriendResultValidator, addFriendValidator } from '../utils/user.validators';


const router = express.Router();

router.get("/friends", requireUser, connectionController.getAllConnection);

router.get("/friends/request", requireUser, connectionController.getAllFriendRequest);

router.get("/friends/request/received", requireUser, connectionController.getAllFriendRequest);

router.post("/add-friend", requireUser, addFriendValidator, validateRequest, connectionController.sendFriendRequest);

router.post("/add-friend/result", requireUser, addFriendResultValidator, validateRequest, connectionController.acceptFriendRequest)

export { router as connectionRouter }