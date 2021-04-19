export interface ActivityBoxesData {
  activityName: string;
  activityPic: string;
  activitySubHeading1: string;
  activitySubHeading2: string;
}

export interface MemberListsData{
  name: string;
  profilePic: string;
  interest: string;
  major: string;
  year: number;
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
  name:string;
}
export interface SelectedMemberLists {
  name: string;
  profilePic: string;
  role: string;
  selected: boolean;
}
export interface MemberTagData {
  name: string;
  role: string;
  profilePic: string;
  selected: boolean;
}
export interface ActivityListsData {
  activityPic: string;
  name: string;
  role: string;
  status: string;
}
export interface EducationListsData {
  educationPic: string;
  faculty: string;
  year: string;
  major: string;
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