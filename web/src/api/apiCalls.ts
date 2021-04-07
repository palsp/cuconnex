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
  const userData: AxiosResponse<IFetchUserData> = await axios.get<IFetchUserData>(
    "/api/users"
  );

  return userData;
};

const userSignupAPI = async (
  signupUserData: IUserSignup
): Promise<AxiosResponse<IResultSigninSignup>> => {
  const userSignupData: AxiosResponse<IResultSigninSignup> = await axios.post<IUserSignup>(
    "/api/users",
    signupUserData
  );
  return userSignupData;
};

const userLogoutAPI = async (): Promise<void> => {
  await axios.post("/api/auth/signout");
};
export { fetchUserDataAPI, userLogoutAPI, userSignupAPI };
