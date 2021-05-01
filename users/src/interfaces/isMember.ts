import { TeamStatus } from '@cuconnex/common';
import { IUserResponse } from './user';

export interface IIsMemberResponse {
  status: TeamStatus | null;
  sender: string;
}

export interface ITeamRequestResponse {
  teamName: string;
  pendingUsers: IUserResponse[];
}
