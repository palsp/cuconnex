import { body } from 'express-validator'
// ALL requst validator(bodyChecker) must declare in this file
export const postUserValidator = [
    body('interests')
        .not()
        .isEmpty()
        .withMessage('Valid interest must be provided'),
    body('name')
        .notEmpty()
        .withMessage('Name must be supplied')
];