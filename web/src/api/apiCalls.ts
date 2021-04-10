import { AxiosResponse } from "axios";
import axios from "@src/api/axiosInstance/axiosInstance";
import {
  ICreateUserData,
  IFetchUserData,
  IUserSignin,
  IUserSignup,
  IResultSigninSignup,
  IFetchEventsData,
  ICreateEventsData,
  IFetchEventsDataResult
} from "@src/models";

//Auth Services
const fetchUserDataAPI = async (): Promise<AxiosResponse<IFetchUserData>> => {
  const userData: AxiosResponse<IFetchUserData> = await axios.get("/api/users");

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
const fetchEventsDataAPI = async (): Promise<AxiosResponse<IFetchEventsData>> => {
  const eventsData: AxiosResponse<IFetchEventsData> = await axios.get("/api/events/");

  return eventsData;
};
const createEventsAPI = async (
  eventsCreatedData: ICreateEventsData
): Promise<AxiosResponse<IFetchEventsDataResult>> => {
  const createEventsData: AxiosResponse<IFetchEventsDataResult> = await axios.post(
    "/api/events/",
    eventsCreatedData
  );
  return createEventsData;
};
export { fetchUserDataAPI, userLogoutAPI, userSignupAPI, userSigninAPI , fetchEventsDataAPI , createEventsAPI , };
