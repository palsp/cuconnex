import { FriendStatus } from "@cuconnex/common";
import { ITeamResponse } from "./team";

export interface IUserResponse {
    id: string,
    name: string,
    image: string,
    faculty?: string,
    year?: string,
    role: string,
    bio: string,
    lookingForTeam: boolean,
    interests: IInterestResponse[];
}

export type IInterestResponse = string;

export interface IViewProfileResponse extends IUserResponse {
    status: FriendStatus | null
}


export interface ISearchAllResponse {
    users: IUserResponse[],
    team: ITeamResponse
}

export interface IFindRelationResponse {
    status: FriendStatus | null
}