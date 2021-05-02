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
  IFetchTeamNotification,
  IFetchFriendsData,
  IConnected,
  IAddFriend,
  IAddFriendResponse,
  ICallTeamOfUser,
  IFetchFriendNotification,
  IFetchFriendReceivedNotification,
  IGetTeam,
  ITeamMembers,
  IUserResponse,
  ITeam,
  IFetchTeam,
  IFetchOutgoingTeamNotification,
  IUserRequest,
  IUserRequestResponse,
  IFetchUserRequestTeam,
  IUserRelationTeam,
  IFetchIncomingTeamNotification,
  ITeamCreatorResponse,
  IFetchTeams,
  IRegisterTeamEvent,
  IFetchTeamEvent,
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
    "/api/events"
  );

  return eventsData;
};
const createEventsAPI = async (
  eventsCreatedData: IEventData
): Promise<AxiosResponse<IEventData>> => {
  const createEventsData: AxiosResponse<IEventData> = await axios.post(
    "/api/events",
    eventsCreatedData
  );
  return createEventsData;
};
const createTeamAPI = async (
  teamCreatedData: ITeamData
): Promise<AxiosResponse<ITeamData>> => {
  const createTeamData: AxiosResponse<ITeamData> = await axios.post(
    "/api/teams",
    teamCreatedData
  );
  console.log("eiei111", createTeamData);

  return createTeamData;
};

const teamInvitationAPI = async (
  invitedData: IInviteData
): Promise<AxiosResponse<IInviteDataResult>> => {
  const invitedUsersData: AxiosResponse<IInviteDataResult> = await axios.post(
    "/api/teams/invite-member",

    invitedData
  );
  return invitedUsersData;
};
const fetchTeamDataAPI = async (
  name: string
): Promise<AxiosResponse<IGetTeam>> => {
  const teamDetailsData: AxiosResponse<IGetTeam> = await axios.get(
    `/api/teams/${name}`
  );
  return teamDetailsData;
};
const callTeamOfUserAPI = async (
  userId: string
): Promise<AxiosResponse<IFetchTeams>> => {
  const calledResult: AxiosResponse<IFetchTeams> = await axios.get(
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
  formData.append("role", createUserData.role);
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
const fetchTeamOutgoingNotificationAPI = async (
  teamName: string
): Promise<AxiosResponse<IFetchOutgoingTeamNotification>> => {
  const teamOutgoingNotificationData: AxiosResponse<IFetchOutgoingTeamNotification> = await axios.get(
    `/api/teams/outgoing-requests/${teamName}`
  );

  return teamOutgoingNotificationData;
};
const fetchTeamIncomingNotificationAPI = async (
  teamName: string
): Promise<AxiosResponse<IFetchIncomingTeamNotification>> => {
  const teamIncomingNotificationData: AxiosResponse<IFetchIncomingTeamNotification> = await axios.get(
    `/api/teams/incoming-requests/${teamName}`
  );

  return teamIncomingNotificationData;
};
const fetchFriendNotificationAPI = async (): Promise<
  AxiosResponse<IFetchFriendNotification>
> => {
  const friendNotificationData: AxiosResponse<IFetchFriendNotification> = await axios.get(
    "/api/users/friends/request/"
  );

  return friendNotificationData;
};
const fetchFriendReceivedNotificationAPI = async (): Promise<
  AxiosResponse<IFetchFriendReceivedNotification>
> => {
  const friendNotificationData: AxiosResponse<IFetchFriendReceivedNotification> = await axios.get(
    "/api/users/friends/request/received"
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
const fetchTeamMembersAPI = async (
  teamName: string
): Promise<AxiosResponse<ITeamMembers>> => {
  const teamMembersResult: AxiosResponse<ITeamMembers> = await axios.get(
    `/api/teams/members/${teamName}`
  );

  return teamMembersResult;
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
const responseTeamInvitationAPI = async (
  responseTeamData: IUserResponse
): Promise<AxiosResponse<IUserResponse>> => {
  const responseData: AxiosResponse<IUserResponse> = await axios.post(
    "/api/users/status/invitation",
    responseTeamData
  );
  return responseData;
};
const userTeamRequestAPI = async (
  requestData: IUserRequest
): Promise<AxiosResponse<IUserRequestResponse>> => {
  const userData: AxiosResponse<IUserRequestResponse> = await axios.post(
    "/api/users/request-to-join",
    requestData
  );
  return userData;
};
const userTeamRelationAPI = async (
  teamName: string
): Promise<AxiosResponse<IUserRelationTeam>> => {
  const relationData: AxiosResponse<IUserRelationTeam> = await axios.get(
    `/api/users/status/${teamName}`
  );
  return relationData;
};
const fetchUserTeamRequestAPI = async (): Promise<
  AxiosResponse<IFetchUserRequestTeam>
> => {
  const teamData: AxiosResponse<IFetchUserRequestTeam> = await axios.get(
    "/api/users/get-my-requests"
  );

  return teamData;
};
const teamOwnerResponseAPI = async (
  ownerResponseData: ITeamCreatorResponse
): Promise<AxiosResponse<ITeamCreatorResponse>> => {
  const responseData: AxiosResponse<ITeamCreatorResponse> = await axios.post(
    "/api/teams/members/status",
    ownerResponseData
  );
  return responseData;
};
const registerTeamEventAPI = async (
  registerData: IRegisterTeamEvent
): Promise<AxiosResponse<IRegisterTeamEvent>> => {
  const registeredData: AxiosResponse<IRegisterTeamEvent> = await axios.post(
    "/api/teams/events/register",
    registerData
  );
  return registeredData;
};
const fetchTeamEventAPI = async (
  teamName: string
): Promise<AxiosResponse<IFetchTeamEvent>> => {
  const eventData: AxiosResponse<IFetchTeamEvent> = await axios.get(
    `/api/teams/incoming-requests/${teamName}`
  );
  return eventData;
};
const fetchEventTeamAPI = async (
  eventId: number
): Promise<AxiosResponse<IFetchTeams>> => {
  const teamData: AxiosResponse<IFetchTeams> = await axios.get(
    `/api/teams/events/candidates/${eventId}`
  );
  return teamData;
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
  fetchFriendReceivedNotificationAPI,
  fetchTeamDataAPI,
  fetchTeamMembersAPI,
  responseTeamInvitationAPI,
  fetchTeamOutgoingNotificationAPI,
  userTeamRequestAPI,
  fetchUserTeamRequestAPI,
  userTeamRelationAPI,
  fetchTeamIncomingNotificationAPI,
  teamOwnerResponseAPI,
  registerTeamEventAPI,
  fetchTeamEventAPI,
  fetchEventTeamAPI,
};
