import { signUp, signIn } from '../controllers/auth.controller';
import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '@cuconnex/common';


const authRoutes = express.Router();


const signupChecker = [
    body('email')
        .notEmpty()
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .notEmpty()
        .withMessage('Password must be supplied'),
    body('sid')
        .isAlphanumeric()
        .notEmpty()
        .withMessage('sid must be supplied')
];


const signInChecker = [
    body('email')
        .notEmpty()
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .notEmpty()
        .withMessage('Password must be supplied'),
]

authRoutes.post("/signup", signupChecker, validateRequest, signUp);

authRoutes.post("/signin", signInChecker, validateRequest, signIn);

export { authRoutes };