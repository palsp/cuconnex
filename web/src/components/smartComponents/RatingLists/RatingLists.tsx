import React, { useContext, useState } from "react";
import classes from "./RatingLists.module.css";
import { RatingList } from "@smartComponents/index";
import { IUser } from "@models/index";
import { UserContext } from "@src/context/UserContext";

interface Props {
  members: IUser[];
  submit: boolean;
  // location: {
  //   state: {
  //     members: IUser[];
  //   };
  // };
}

const RatingLists: React.FC<Props> = (props) => {
  const { userData } = useContext(UserContext);
  // const [rated, setRated] = useState<boolean>(false);
  // const ratedUsersHanlder = (rating: number | null) => {
  //   if (typeof rating !== null) {
  //     setRated(true);
  //     console.log("RatingLists True");
  //   } else {
  //     setRated(false);
  //     console.log("RatingLists False");
  //   }
  // };
  return (
    <div>
      {props.members?.map((member: IUser, index: number) => {
        if (member?.id !== userData.id) {
          return (
            <RatingList
              key={index}
              member={member}
              // ratedUserHandler={(rating: number | null) =>
              //   ratedUsersHanlder(rating)
              // }
              submit={props.submit}
            />
          );
        }
      })}
    </div>
  );
};

export default RatingLists;
