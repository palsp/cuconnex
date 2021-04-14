import express from 'express';
import { businessLogic } from '../controllers/example.controller';
import { someMiddleware } from '../middleware';


const router = express.Router()

// No logic is allowed in this file 
// if middleware is needed, declared middleware in middleware folder and import to this file
router.post("/", someMiddleware, businessLogic);

export { router as SomeRouter };