import React, { useState } from "react";
import { IUser } from "@models/index";
import { fetchUserDataAPI } from "@api/index";

interface IUserContext {
  userData: IUser;
  fetchUserDataHandler: () => Promise<void>;
  setUserDataHandler: (updatedUserData: any) => void;
}

export const UserContext = React.createContext<IUserContext>(
  {} as IUserContext
);

export const UserContextProvider = (props: any) => {
  const [userData, setUserData] = useState<IUser>({
    id: "",
    name: "",
    // interests: {
    //   Technology: [],
    //   Business: [],
    //   Design: [],
    // },
    interests: [],
    faculty: "",
    year: "",
    role: "",
    bio: "",
    image: "",
  });

  const fetchUserDataHandler = async () => {
    try {
      const userData = await fetchUserDataAPI();
      console.log("SUCCESS fetchDataHandler", userData);
      setUserData(userData.data);
    } catch (e) {
      throw new Error("fetchDataHandler error");
    }
  };

  const setUserDataHandler = (updatedUserData: any) => {
    setUserData((prevState) => ({
      ...prevState,
      id: updatedUserData.id || prevState.id,
      name: updatedUserData.name || prevState.name,
      // interests: {
      //   Technology:
      //     updatedUserData.interests.Technology ||
      //     prevState.interests.Technology,
      //   Business:
      //     updatedUserData.interests.Business || prevState.interests.Business,
      //   Design: updatedUserData.interests.Design || prevState.interests.Design,
      // },
      interests: updatedUserData.interests || prevState.interests,
      faculty: updatedUserData.faculty || prevState.faculty,
      image: updatedUserData.image || prevState.image,
      role: updatedUserData.role || prevState.role,
    }));
    console.log("setUserDataHandler data is...", updatedUserData);
  };
  return (
    <UserContext.Provider
      value={{ userData, fetchUserDataHandler, setUserDataHandler }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
