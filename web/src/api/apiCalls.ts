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

export {
  fetchUserDataAPI,
  userLogoutAPI,
  userSignupAPI,
  userSigninAPI,
  createUserDataAPI,
};
