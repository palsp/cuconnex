import { body } from 'express-validator';
import { InterestDescription } from '@cuconnex/common';

/**
 * name and description is required to create team
 */
export const createTeamValidator = [
  body('name').notEmpty().isAlphanumeric().withMessage('Team name must be supplied'),
  body('description').notEmpty().withMessage('Team description must be supplied'),
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
