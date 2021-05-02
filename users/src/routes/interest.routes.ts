import express from 'express'
import { getInterest } from '../controllers/user.controller';

const router = express.Router();

router.get("/interests", getInterest);

export { router as interestRouter }