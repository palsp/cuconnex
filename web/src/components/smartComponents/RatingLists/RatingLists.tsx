import React, { useContext, useState } from "react";
import classes from "./RatingLists.module.css";
import { RatingList } from "@smartComponents/index";
import { IUser } from "@models/index";
import { UserContext } from "@src/context/UserContext";

interface Props {
  members: IUser[];
  submit: boolean;
}

const RatingLists: React.FC<Props> = (props) => {
  const { userData } = useContext(UserContext);

  return (
    <div>
      {props.members?.map((member: IUser, index: number) => {
        if (member?.id !== userData.id) {
          return (
            <RatingList key={index} member={member} submit={props.submit} />
          );
        }
      })}
    </div>
  );
};

export default RatingLists;
