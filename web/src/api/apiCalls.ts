import { AxiosResponse } from "axios";
import axios from "@src/api/axiosInstance/axiosInstance";
import { FetchUserData } from "@src/models/index";

const fetchUserData = async (): Promise<AxiosResponse<FetchUserData>> => {
  const userData: AxiosResponse<FetchUserData> = await axios.get<FetchUserData>(
    "/api/users"
  );

  return userData;
};

const userLogout = async (): Promise<void> => {
  await axios.post("/api/auth/signout");
};
export { fetchUserData, userLogout };
