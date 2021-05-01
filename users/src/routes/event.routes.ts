import express from 'express';
import * as eventController from '../controllers/event.controller';
import { requireUser } from '../middlewares';

const router = express.Router();

router.get('/events/candidates/:eventId', requireUser, eventController.getRegisteredTeams);

export { router as eventRouter };
