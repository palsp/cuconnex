import { TeamStatus } from '@cuconnex/common';
import { ITeamResponse } from './team';
import { IUserResponse } from './user';

export interface IEventResponse {
  id: number;
  eventName: string;
  registration: boolean;
  version?: number | undefined;
}
