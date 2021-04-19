import express from 'express'
import { getInterest } from '../controllers/user.controller';

const router = express.Router();

router.get("/api/interests/:interest/:category", getInterest);

export { router as interestRouter }