export interface IUserResponse {
    id: string,
    name: string,
    image: string,
    faculty: string,
    year: string,
    major: string,
    bio: string,
    lookingForTeam: string,
    interests?: IInterestResponse[];
}

export type IInterestResponse = string;