import { Request } from "express"
export interface ICustomRequestWithUserId extends Request {
    userId: string // or any other type
}