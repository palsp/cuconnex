import { AxiosResponse } from "axios";
import axios from "@src/api/axiosInstance/axiosInstance";
import {
  ICreateUserData,
  IFetchUserData,
  IUserSignin,
  IUserSignup,
  IResultSigninSignup,
  IFetchEventsData,
  IEventData,
  ITeamData,
  IInviteData,
  IInviteDataResult,
  ISearchUserTeamEventResult,
  IUser,
  ITeam,
  IFetchTeamNotification,
  IFetchFriendsData,
  IConnected,
  IAddFriend,
  IAddFriendResponse,
  ICallTeamOfUser,
  IFetchFriendNotification,
} from "@src/models";

//Auth Services
const fetchUserDataAPI = async (): Promise<AxiosResponse<IUser>> => {
  const userData: AxiosResponse<IUser> = await axios.get(
    "/api/users/current-user"
  );

  return userData;
};

const userSignupAPI = async (
  signupUserData: IUserSignup
): Promise<AxiosResponse<IResultSigninSignup>> => {
  const userSignupData: AxiosResponse<IResultSigninSignup> = await axios.post(
    "/api/auth/signup",
    signupUserData
  );
  return userSignupData;
};

const userSigninAPI = async (
  signinUserData: IUserSignin
): Promise<AxiosResponse<IResultSigninSignup>> => {
  const userSigninData: AxiosResponse<IResultSigninSignup> = await axios.post(
    "/api/auth/signin",
    signinUserData
  );
  console.log(userSigninData.data);
  return userSigninData;
};
const userLogoutAPI = async (): Promise<void> => {
  await axios.post("/api/auth/signout");
};
const fetchEventsDataAPI = async (): Promise<
  AxiosResponse<IFetchEventsData>
> => {
  const eventsData: AxiosResponse<IFetchEventsData> = await axios.get(
    "/api/events/"
  );

  return eventsData;
};
const createEventsAPI = async (
  eventsCreatedData: IEventData
): Promise<AxiosResponse<IEventData>> => {
  const createEventsData: AxiosResponse<IEventData> = await axios.post(
    "/api/events/",
    eventsCreatedData
  );
  return createEventsData;
};
const createTeamAPI = async (
  teamCreatedData: ITeamData
): Promise<AxiosResponse<ITeamData>> => {
  const createTeamData: AxiosResponse<ITeamData> = await axios.post(
    "/api/teams/",
    teamCreatedData
  );
  return createTeamData;
};

const teamInvitationAPI = async (
  invitedData: IInviteData
): Promise<AxiosResponse<IInviteDataResult>> => {
  const invitedUsersData: AxiosResponse<IInviteDataResult> = await axios.post(
    "/api/members/invite/",
    invitedData
  );
  return invitedUsersData;
};
const callTeamOfUserAPI = async (
  userId: string
): Promise<AxiosResponse<ICallTeamOfUser>> => {
  const calledResult: AxiosResponse<ICallTeamOfUser> = await axios.get(
    `/api/users/teams/${userId}`
  );

  return calledResult;
};

const createUserDataAPI = async (
  createUserData: ICreateUserData
): Promise<AxiosResponse<IFetchUserData>> => {
  const formData = new FormData();
  formData.append("name", createUserData.name);
  formData.append("interests", JSON.stringify(createUserData.interests));
  formData.append("faculty", createUserData.faculty);
  formData.append("image", createUserData.image);
  formData.append("bio", createUserData.bio);
  formData.append("year", createUserData.year);
  const userCreatedData = await axios({
    method: "post",
    url: "/api/users/",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return userCreatedData;
};

const searchUserTeamEvent = async (
  searchQuery: string
): Promise<AxiosResponse<ISearchUserTeamEventResult>> => {
  const searchResult: AxiosResponse<ISearchUserTeamEventResult> = await axios.get(
    `/api/query/${searchQuery}`
  );

  return searchResult;
};

const fetchTeamNotificationAPI = async (): Promise<
  AxiosResponse<IFetchTeamNotification>
> => {
  const teamNotificationData: AxiosResponse<IFetchTeamNotification> = await axios.get(
    "/api/users/notification/invite/"
  );

  return teamNotificationData;
};
const fetchFriendNotificationAPI = async (): Promise<
  AxiosResponse<IFetchFriendNotification>
> => {
  const friendNotificationData: AxiosResponse<IFetchFriendNotification> = await axios.get(
    "/api/users/friends/request/"
  );

  return friendNotificationData;
};
const fetchRelationAPI = async (
  userId: string
): Promise<AxiosResponse<IConnected>> => {
  const relationResult: AxiosResponse<IConnected> = await axios.get(
    `/api/users/relation/${userId}`
  );

  return relationResult;
};
const fetchFriendsDataAPI = async (): Promise<
  AxiosResponse<IFetchFriendsData>
> => {
  const userData: AxiosResponse<IFetchFriendsData> = await axios.get(
    "/api/users/friends"
  );

  return userData;
};
const addFriendAPI = async (
  addFriendData: IAddFriend
): Promise<AxiosResponse<IAddFriend>> => {
  const friendAddData: AxiosResponse<IAddFriend> = await axios.post(
    "/api/users/add-friend/",
    addFriendData
  );
  return friendAddData;
};
const addFriendResponseAPI = async (
  addFriendResponseData: IAddFriendResponse
): Promise<AxiosResponse<IAddFriendResponse>> => {
  const friendResponseData: AxiosResponse<IAddFriendResponse> = await axios.post(
    "/api/users/add-friend/result/",
    addFriendResponseData
  );
  return friendResponseData;
};

export {
  fetchUserDataAPI,
  userLogoutAPI,
  userSignupAPI,
  userSigninAPI,
  createUserDataAPI,
  teamInvitationAPI,
  fetchEventsDataAPI,
  createEventsAPI,
  createTeamAPI,
  searchUserTeamEvent,
  fetchTeamNotificationAPI,
  fetchFriendNotificationAPI,
  fetchFriendsDataAPI,
  fetchRelationAPI,
  addFriendAPI,
  callTeamOfUserAPI,
  addFriendResponseAPI,
};
