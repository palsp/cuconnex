"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const auth_controller_1 = require("../controllers/auth.controller");
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const common_1 = require("@cuconnex/common");
const authRoutes = express_1.default.Router();
exports.authRoutes = authRoutes;
/**Checks if there is email password and id within the request body object
 * @returns {boolean} true if the request body's contains all the required fields, false otherwise.
 *
 *
*/
/* TODO add password format */
const signupChecker = [
    express_validator_1.body('email')
        .notEmpty()
        .isEmail()
        .withMessage('Email must be valid'),
    express_validator_1.body('password')
        .notEmpty()
        .withMessage('Password must be supplied'),
    express_validator_1.body('id')
        .isAlphanumeric()
        .notEmpty()
        .withMessage('id must be supplied')
];
/**Checks if there is email password within the request body object
 * @returns {boolean} true if the request body's contains all the required fields, false otherwise.
*/
const signInChecker = [
    express_validator_1.body('email')
        .notEmpty()
        .isEmail()
        .withMessage('Email must be valid'),
    express_validator_1.body('password')
        .notEmpty()
        .withMessage('Password must be supplied'),
];
authRoutes.post("/signup", signupChecker, common_1.validateRequest, auth_controller_1.signUp);
authRoutes.post("/signin", signInChecker, common_1.validateRequest, auth_controller_1.signIn);
authRoutes.post("/signout", auth_controller_1.signOut);
