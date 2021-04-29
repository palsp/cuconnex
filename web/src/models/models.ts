// Auth Services
export interface IUser {
  id: string;
  name: string;
  // interests: {
  //   Technology: string[];
  //   Business: string[];
  //   Design: string[];
  // };
  interests: string[];
  faculty: string;
  year: string;
  role: string;
  bio: string;
  image: string;
}
export interface IUserFriend {
  id: string;
  name: string;
  connections: {
    receiverId: string;
    senderId: string;
    status: string;
  };
  interests: string[];
  faculty: string;
  year: string;
  role: string;
  bio: string;
  image: string;
}

export interface ITeam {
  name: string; // team name
  creatorId: string;
  description: string;
  lookingForMembers: boolean;
}

export interface ISearchUserTeamEventResult {
  users: IUser[];
  team: ITeam[];
  events: IEventData[];
}
export interface IUserSignup {
  email: string;
  password: string;
  id: string;
}

export interface IResultSigninSignup {
  email: string;
  id: string;
  faculty: string;
  year: number;
}

export interface IUserSignin {
  email: string;
  password: string;
}
//Friend
export interface IConnected {
  status: string;
}
export interface IAddFriend {
  userId: string;
}
export interface IAddFriendResponse {
  userId: string;
  accepted: boolean;
}
// User Services

export interface IFetchUserData {
  id: string;
  name: string;
  // interests: {
  //   Technology: string[];
  //   Business: string[];
  //   Design: string[];
  // };
  interests: string[];
  faculty: string;
  year: string;
  role: string;
  bio: string;
  image: string;
}

export interface ICreateUserData {
  name: string;
  interests: {
    Technology: string[];
    Business: string[];
    Design: string[];
  };
  faculty: string;
  bio: string;
  year: string;
  image: File;
  role: string;
}

export interface IFetchFriendsData {
  connections: IUserFriend[];
}
//events
export interface IFetchEventsData {
  events: [IEventData];
}
export interface IFetchEventsDataResult {
  events: [IEventData];
}
export interface IEventData {
  "event-name": string;
  bio: string;
  status?: string;
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
//team
export interface IGetTeam {
  team: ITeam;
}
export interface ITeamData {
  name: string;
  description: string;
}

export interface ITeamDataResult {
  message: string;
}

export interface ITeamMembers {
  users: IUser[];
}

export interface IInviteData {
  teamName: string;
  newMemberId: string;
}

export interface IInviteDataResult {
  User: string;
  Team: string;
}

export interface ICallTeamOfUser {
  teams: ITeam[];
}

export interface IUserResponse {
  teamName: string;
  newStatusFromUser: string;
}

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

//Notifications
export interface IFetchTeamNotification {
  teams: ITeam[];
}
export interface IFetchFriendNotification {
  requests: IUserFriend[];
}
export interface IFetchFriendReceivedNotification {
  requests: IUserFriend[];
}

//Search
export interface ISearchGeneral {
  users: IUser[];
  teams: ITeam[];
}

const containerVariants = {
  hidden: {
    opacity: 0.85,
    x: window.innerWidth,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

//Education

export interface IEducationData {
  faculty: string;
  year: string;
}

export default containerVariants;
