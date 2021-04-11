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

export enum FacultyListsEnum {
  AlliedHealthSciences = "Allied Health Sciences", // สหเวช
  Architecture = "Architecture",
  Arts = "Arts",
  CommunicationArts = "Communication Arts",
  CommerceAndAccountancy = "Commerce and Accountancy", // บัญชี
  Dentistry = "Dentistry",
  Economics = "Economics",
  Education = "Education", // ครุศาสตร์
  Engineering = "Engineering",
  FineAndAppliedArts = "Fine and Applied Arts", // ศิลปกรรม
  Law = "Law",
  Medicine = "Medicine",
  Nursing = "Nursing",
  PharmaceuticalSciences = "Pharmaceutical Sciences",
  PoliticalSciences = "Political Sciences",
  Psychology = "Psychology",
  Science = "Science",
  SportsScience = "Sports Science",
  VeterinaryScience = "VeterinaryScience",
  IntegratedInnovation = "Integrated Innovation", // วัฒนกรรมบูรณาการ
  AgriculturalResources = "Agricultural Resources",
}
