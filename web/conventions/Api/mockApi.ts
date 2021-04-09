import {AxiosResponse} from "axios";
import axios from "./axiosInstance/axiosInstance";
import {User, WriteResult, SomeValueEnum} from "../Models";

//ALWAYS delcare function return type
const getData = async (): Promise<AxiosResponse<User> | string> => {
  //ALWAYS DECLARE DATA TYPE
  const data: AxiosResponse<User> = await axios.get<User>("/api/users");
  if (!data) {
    //failed to get
    return "failed to get data";
  } else {
    return data;
  }
};

const setData = async ({
  id,
  name,
}: {
  id: string;
  name: string;
}): Promise<AxiosResponse<WriteResult>> => {
  const user: User = {
    id: id,
    name: name,
    someValue: SomeValueEnum.YES,
  };
  const res: AxiosResponse<WriteResult> = await axios.post<WriteResult>("/api/auth/signin", user);
  return res;
};

export {getData, setData};
