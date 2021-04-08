import { AxiosResponse } from "axios";
import axios from "@src/api/axiosInstance/axiosInstance";
import {
  ICreateUserData,
  IFetchUserData,
  IUserSignin,
  IUserSignup,
  IResultSigninSignup,
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
export { fetchUserDataAPI, userLogoutAPI, userSignupAPI, userSigninAPI };
