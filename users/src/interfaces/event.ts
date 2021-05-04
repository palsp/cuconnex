import { ITeamResponse } from './team';

export interface IEventResponse {
  id: number;
  eventName: string;
  registration: boolean;
  candidate?: ITeamResponse[],
  version?: number | undefined;
}

export interface IGetRegisterEventResponse{
    events : IEventResponse[];
}