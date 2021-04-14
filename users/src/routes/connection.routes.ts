import express from 'express'
import * as connectionController from '../controllers/connection.controller';
import { requireUser } from '../middlewares';


const router = express.Router();

router.get("/friends", requireUser, connectionController.getAllConnection);

router.get("/friends/request", requireUser, connectionController.getAllFriendRequest);

export { router as connectionRouter }