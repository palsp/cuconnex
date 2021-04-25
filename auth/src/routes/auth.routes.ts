import { signUp, signIn, signOut } from '../controllers/auth.controller';
import express from 'express';
import { body } from 'express-validator';
import { isValidID, validateRequest } from '@cuconnex/common';


const authRoutes = express.Router();

/**Checks if there is email password and id within the request body object
 * @returns {boolean} true if the request body's contains all the required fields, false otherwise.
 * 
 * 
*/

/* TODO add password format */
const signupChecker = [
    body('email')
        .notEmpty()
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .notEmpty()
        .withMessage('Password must be supplied'),
    body('id')
        .notEmpty()
        .custom((id: string) => {
            return isValidID(id);
        })
        .withMessage('id must be supplied')

];

/**Checks if there is email password within the request body object
 * @returns {boolean} true if the request body's contains all the required fields, false otherwise.
*/
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

authRoutes.post("/signout", signOut);


export { authRoutes };