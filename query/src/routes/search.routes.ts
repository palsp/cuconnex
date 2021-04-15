import express from 'express';
import { searchHandler } from '../controllers/search.controller';

const router = express.Router();


router.get("/search/:keyword", searchHandler)

export { router as searchRouter }