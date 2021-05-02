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
 * The fields must be of correct type
 */

export const editUserValidator = [
  body('interests')
    .custom((input: { [key: string]: any }) => {
      // check for validity
      let valid = true;
      // check if key in interests filed is existed in InterestDescription
      for (let key in input) {
        valid = valid && (key in InterestDescription)
        if (input[key]) {
          valid = valid && Array.isArray(input[key])
        }
      }

      // expect valid to be true so the process continue
      return valid
    })
    .withMessage('Valid interest must be provided'),
  body('name')
    .notEmpty()
    .withMessage('Name must be supplied'),
  body('bio')
    .notEmpty()
    .withMessage('Bio must be supplied'),
  body('lookingForTeam')
    .notEmpty()
    .withMessage('lookingForTeam must be supplied')
    .isBoolean()
    .withMessage('lookingForTeam is invalid')
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

export const requestToJoinTeamValidator = [
  body('teamName').notEmpty().isAlphanumeric().withMessage('Team name must be supplied'),
];

export const addRatingValidator = [
  body('rateeId').notEmpty().isAlphanumeric().withMessage('Ratee id is not valid'),
  body('ratings')
    .notEmpty()
    .isNumeric()
    .custom((input : number) => input >= 0 && input <= 5)
    .withMessage('Ratings must be a number and its value must be between 0 and 5 inclusively'),
];
