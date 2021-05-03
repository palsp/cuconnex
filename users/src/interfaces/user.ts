import { FriendStatus } from '@cuconnex/common';
import { ITeamResponse } from './team';

export interface IUserRequest {
  name: string;
  image: string;
  role: string;
  interests: InterestBody;
  bio: string;
  lookingForTeam: boolean;
  file: any;
}

export interface IUserResponse {
  id: string;
  name: string;
  image: string;
  faculty?: string;
  year?: string;
  role: string;
  bio: string;
  lookingForTeam: boolean;
  interests: IInterestResponse[];
}

// export type InterestBody = {
//     Technology?: Technology[],
//     Design?: Design[],
//     Business?: Business[],
// }

export interface InterestBody {
  [key: string]: string[];
}
export type IInterestResponse = string;

export interface IViewProfileResponse extends IUserResponse {
  status: FriendStatus | null;
}

export interface ISearchAllResponse {
  users: IUserResponse[];
  team: ITeamResponse;
}

export interface IFindRelationResponse {
  status: FriendStatus | null;
}

export interface IRecommendTeam {
  teams: ITeamResponse[];
}

export interface IAddRatingRequest {
  rateeId: string;
  ratings: number;
}
