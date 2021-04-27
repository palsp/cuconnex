import { FriendStatus } from "@cuconnex/common";
import { IUserResponse } from "./user";

export interface IGetAllConnectionResponse {
    connections: IUserResponse[]
}

export interface IGetAllFriendRequest {
    requests: IUserResponse[]
}

export interface IAcceptFriendRequest {
    status: FriendStatus
}