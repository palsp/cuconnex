export interface ActivityBoxesData {
  activityName: string;
  activityPic: string;
  activitySubHeading1: string;
  activitySubHeading2: string;
}

export interface PeopleListsData {
  name: string;
  profilePic: string;
  interest: string;
}

export interface SelectedMemberLists {
  name: string;
  profilePic: string;
  role: string;
  selected: boolean;
}

export interface InterestListsData {
  name: string;
}
export interface SelectedMemberLists {
  name: string;
  profilePic: string;
  role: string;
  selected: boolean;
}
export interface MemberTagData {
  users: UsersData[];
}
export interface ActivityListsData {
  activityPic: string;
  name: string;
  role: string;
  status: string;
}
export interface EducationListsData {
  // educationPic: string;
  faculty: string;
  year: string;
  // major: string;
}
export interface MyTeamListsData {
  name: string;
  event: string;
  status: string;
}
export interface TeamActivitiesData {
  teamActivityPic: string;
  name: string;
  event: string;
  status: string;
}

export interface ConnectionListsData {
  profilePic: string;
  name: string;
  role: string;
  faculty: string;
}

export interface TeamInvitationListsData {
  teamPic: string;
  teamName: string;
  event: string;
}

export interface MembersInActivityNotificationData {
  profilePic: string;
  name: string;
  role: string;
  faculty: string;
  status: string;
}

export interface PositionsInActivityNotificationData {
  teamPic: string;
  role: string;
  teamName: string;
  teamList: string;
  status: string;
}

export interface UsersData {
  id: string;
  name: string;
  interests: {
    Technology: string[];
    Business: string[];
    Design: string[];
  };
  faculty: string;
  year: string;
  role: string;
  bio: string;
  image: string;
}
export interface InterestData {
  Business: string[];
  Technology: string[];
  Design: string[];
}
