import { IUserResponse } from './user';

export interface ITeamResponse {
  name: string;
  creatorId: string;
  description: string;
  lookingForMembers: boolean;
  members: IUserResponse[];
}

export interface IRecommendUserResponse {
  users : IUserResponse[];
}