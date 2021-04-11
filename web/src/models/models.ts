// Auth Services

export interface IUserSignup {
  email: string;
  password: string;
  id: string;
}

export interface IResultSigninSignup {
  email: string;
  id: string;
}

export interface IUserSignin {
  email: string;
  password: string;
}

// User Services

export interface IFetchUserData {
  id: string;
  name: string;
  interests: {
    Technology: string[];
    Business: string[];
    Design: string[];
  };
  faculty: string;
}

export interface ICreateUserData {
  name: string;
  interests: {
    Technology: string[];
    Business: string[];
    Design: string[];
  };
  faculty: string;
}
//events
export interface IFetchEventsData {
  events: [
    IEventData
  ]
}
export interface IFetchEventsDataResult {
  events: [
    IEventData
  ]
}
export interface IEventData {
  "event-name": string;
  bio: string;
  "start-date": {
    month: number;
    day: number;
    year: number;
    time: {
      hour: number;
      minute: number;
      second: number;
    };
  };
  "end-date": {
    month: number;
    day: number;
    year: number;
    time: {
      hour: number;
      minute: number;
      second: number;
    };
  };
}
