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
  ISearchUserTeamEventResult,
  IUser,
  ITeam,
} from "@src/models";

//Auth Services
const fetchUserDataAPI = async (): Promise<AxiosResponse<IUser>> => {
  const userData: AxiosResponse<IUser> = await axios.get("/api/users");

  return userData;
};
const fetchUserDataAPINoAxiosResponse = async (): Promise<IFetchUserData> => {
  const userData: IFetchUserData = await axios.get("/api/users");

  return userData;
};

const testFetchUserData = async () => {
  const userData = await axios.get("/api/users");
  return userData;
};

const testIUSER = async (): Promise<AxiosResponse<IUser>> => {
  const userData: AxiosResponse<IUser> = await axios.get("/api/users");
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

const createUserDataAPI = async (
  createUserData: ICreateUserData
): Promise<AxiosResponse<IFetchUserData>> => {
  const formData = new FormData();
  formData.append("name", createUserData.name);
  formData.append("interests", JSON.stringify(createUserData.interests));
  formData.append("faculy", createUserData.faculty);
  formData.append("myFile", createUserData.profilePic);
  const userCreatedData = await axios({
    method: "post",
    url: "/api/users/",
    data: createUserData,
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
export {
  fetchUserDataAPI,
  fetchUserDataAPINoAxiosResponse,
  userLogoutAPI,
  userSignupAPI,
  userSigninAPI,
  createUserDataAPI,
  fetchEventsDataAPI,
  createEventsAPI,
  createTeamAPI,
  searchUserTeamEvent,
  testFetchUserData,
  testIUSER,
};
