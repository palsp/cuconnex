import React, { useState } from "react";
import { IUser } from "@models/index";
import { fetchUserDataAPI } from "@api/index";

interface IUserContext {
  userData: IUser;
  fetchUserDataHandler: () => Promise<void>;
  setUserDataHandler: (updatedUserData: any) => void;
  clearUserDataHandler: () => void;
}

export const UserContext = React.createContext<IUserContext>(
  {} as IUserContext
);

interface Props {
  children: React.ReactNode;
}

export const UserContextProvider: React.FC<Props> = (props) => {
  const [userData, setUserData] = useState<IUser>({
    id: "",
    name: "",
    interests: {
      Technology: [],
      Business: [],
      Design: [],
    },
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
      interests: {
        Technology:
          updatedUserData.interests.Technology ||
          prevState.interests.Technology,
        Business:
          updatedUserData.interests.Business || prevState.interests.Business,
        Design: updatedUserData.interests.Design || prevState.interests.Design,
      },
      faculty: updatedUserData.faculty || prevState.faculty,
      image: updatedUserData.image || prevState.image,
      role: updatedUserData.role || prevState.role,
    }));
    console.log("setUserDataHandler data is...", updatedUserData);
  };

  const clearUserDataHandler = () => {
    setUserData({
      id: "",
      name: "",
      interests: {
        Technology: [],
        Business: [],
        Design: [],
      },
      faculty: "",
      year: "",
      role: "",
      bio: "",
      image: "",
    });
  };
  return (
    <UserContext.Provider
      value={{
        userData,
        fetchUserDataHandler,
        setUserDataHandler,
        clearUserDataHandler,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
