import { IEventResponse } from './event';
import { IUserResponse } from './user';

export interface ITeamResponse {
  name: string;
  creatorId: string;
  description: string;
  lookingForMembers: boolean;
  members: IUserResponse[];
  // eventParticipatings: IEventResponse[];
}

export interface ITeamRequest {
  name: string;
  description: string;
  currentRecruitment: string;
  lookingForMembers: boolean;
  file: any;
}

export interface IRecommendUserResponse {
  users : IUserResponse[];
}