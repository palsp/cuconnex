import { TeamStatus } from '@cuconnex/common';
import { ITeamResponse } from './team';
import { IUserResponse } from './user';

export interface IIsMemberResponse {
  teamName: string;
  relations: {
    users: IUserResponse[];
    status: TeamStatus;
  };
}

export interface IOutgoingRequestResponse {
  teamName: string;
  pendingUsers: IUserResponse[];
}
