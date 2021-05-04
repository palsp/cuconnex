import React, { useContext, useState } from "react";
import classes from "./RatingLists.module.css";
import { RatingList } from "@smartComponents/index";
import { IUser } from "@models/index";
import { Rating } from "@pages/RatingPage/RatingPage";

interface Props {
  ratings: Rating[];
}

const RatingLists: React.FC<Props> = (props) => {
  console.log("RatingLists: ", props.ratings);
  return (
    <div>
      {props.ratings?.map((rating: Rating, index: number) => {
        console.log("RatingListsIndex: ", index);
        return <RatingList key={index} rating={rating} />;
      })}
    </div>
  );
};

export default RatingLists;
