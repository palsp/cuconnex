import { body } from 'express-validator';
import { InterestDescription } from '@cuconnex/common';

/**
 * name and interests is required to create user profile
 */
export const postUserValidator = [
  body('interests')
    .not()
    .isEmpty()
    .custom((input: { [key: string]: any }) => {
      // check for validity
      let valid = true;

      // check if key in interests filed is existed in InterestDescription
      for (let key in input) {
        valid = valid && key in InterestDescription;

        if (input[key]) {
          valid = valid && Array.isArray(input[key]);
        }
      }

      // expect valid to be true so the process continue
      return valid;
    })
    .withMessage('Valid interest must be provided'),
  body('name').notEmpty().withMessage('Name must be supplied'),
];

/**
 * userId is required to add this user as a friend
 */
export const addFriendValidator = [body('userId').notEmpty().isAlphanumeric()];

/**
 * userId and accepted is required to accept or rejected add freind request
 */
export const addFreindResultValidator = [
  body('userId').notEmpty().isAlphanumeric().withMessage('User id is not valid'),
  body('accepted').notEmpty().isBoolean(),
];

export const manageUserStatusValidator = [
  body('teamName').notEmpty().isAlphanumeric(),
  body('newStatusFromUser').notEmpty(),
];
