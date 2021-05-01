import { InterestDescription } from '@cuconnex/common';

export enum TableName {
  users = 'users',
  events = 'events',
  interests = 'interests',
  connections = 'connections',
  recommendations = 'recommendations',
  isMembers = 'isMembers',
  userInterest = 'userInterests',
  category = 'categories',
  teams = 'teams',
  faculty = 'faculty',
  rating = 'rating',
}

/**
 * used for enum values of interest description filed
 */
let desc: any[] = [];

for (let key in InterestDescription) {
  const interest = Object.values(InterestDescription[key]);
  desc = desc.concat(interest);
}

export { desc as InterestEnumVal };
