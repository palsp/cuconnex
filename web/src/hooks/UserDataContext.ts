import React, { createContext } from "react";
import { IUser } from "@models/index";
interface defaultStateValue {
  userData: IUser;
  setUserData: React.Dispatch<React.SetStateAction<IUser>>;
}
export const UserDataContext = createContext<defaultStateValue>(
  {} as defaultStateValue
);
