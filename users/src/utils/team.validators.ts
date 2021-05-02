import { body } from 'express-validator';

/**
 * name and description is required to create team
 */
export const createTeamValidator = [
  body('name').notEmpty().isAlphanumeric().withMessage('Team name must be supplied'),
  body('description').notEmpty().withMessage('Team description must be supplied'),
];

export const editTeamValidator = [
  body('name').notEmpty().isAlphanumeric().withMessage('Team name must be supplied'),
  body('description').notEmpty().withMessage('Team description must be supplied'),
  // body('image').notEmpty().withMessage('Team image must be supplied'),
  body('currentRecruitment').notEmpty().withMessage('Team currentRecruitment must be supplied'),
  body('lookingForMembers')
    .notEmpty()
    .isBoolean()
    .withMessage('LookingForMembers attribute must be supplied'),
];

export const addTeamMemberValidator = [
  body('teamName').notEmpty().isAlphanumeric().withMessage('Team name must be supplied'),
  body('newMemberId').notEmpty().isAlphanumeric().withMessage('New Member Id must be supplied'),
];

export const manageTeamStatusValidator = [
  body('targetUserId').notEmpty().isAlphanumeric(),
  body('teamName').notEmpty().isAlphanumeric(),
  body('status').notEmpty(),
];

export const registerEventValidator = [
  body('eventId').notEmpty(),
  body('teamName').notEmpty().isAlphanumeric(),
];
