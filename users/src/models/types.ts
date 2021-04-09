import { InterestDescription } from '@cuconnex/common'

export enum TableName {
  users = 'users',
  interests = 'interests',
  connections = 'connections',
  members = 'members',
  userInterest = 'userInterests',
  category = 'categories',
  teams = 'teams',
}

/**
 * used for enum values of interest description filed
 */
let desc: any[] = [];

for (let key in InterestDescription) {
  const interest = Object.values(InterestDescription[key]);
  desc = desc.concat(interest)
}

export { desc as InterestEnumVal }


