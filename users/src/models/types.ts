import { InterestDescription } from '@cuconnex/common'

export enum TableName {
  users = 'users',
  interests = 'interests',
  friends = 'friends',
  members = 'members',
  userInterest = 'userInterests',
  category = 'categories',
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


