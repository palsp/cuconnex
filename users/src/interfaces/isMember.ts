import { TeamStatus } from '@cuconnex/common';
import { IUserResponse } from './user';

export interface IIsMemberResponse {
  teamName: string;
  outGoingRequests: IOutGoingRequest[];
}

export interface IOutGoingRequest {
  user: IUserResponse;
  status: TeamStatus;
}
