import React, { useContext, useState } from "react";
import classes from "./RatingLists.module.css";
import { RatingList } from "@smartComponents/index";
import { IUser } from "@models/index";
import { UserContext } from "@src/context/UserContext";
import { Rating } from "@pages/RatingPage/RatingPage";

interface Props {
  ratings: Rating[];
  submit: boolean;
}

const RatingLists: React.FC<Props> = (props) => {
  const { userData } = useContext(UserContext);

  return (
    <div>
      {props.ratings?.map((rating: Rating, index: number) => {
        if (rating.user?.id !== userData.id) {
          return (
            <RatingList key={index} rating={rating} submit={props.submit} />
          );
        }
      })}
    </div>
  );
};

export default RatingLists;
