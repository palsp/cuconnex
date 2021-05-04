import React, { useState, useEffect } from "react";
import { ProfilePic } from "@smartComponents/index";
import { RatingStar } from "@dumbComponents/UI/index";
import classes from "./RatingList.module.css";
import { IUser, IRateUser } from "@models/index";
import { rateUserAPI } from "@api/index";
import { Rating } from "@pages/RatingPage/RatingPage";

interface Props {
  rating: Rating;
  // ratedUserHandler: (rating: number | null) => void;
}

const RatingList: React.FC<Props> = (props) => {
  const { rating } = props;
  console.log("RatingList: ", rating);

  const ratedUserHandler = (score: number | null) => {
    rating.setRating((prev) => {
      const newArr = prev;
      newArr[rating.ratingId].rating = score;
      console.log("RatingList ratedUserHandler: ", score);
      return newArr;
    });
  };

  return (
    <div className={classes.ratingList}>
      <div className={classes.divRatingList}>
        <div>
          <ProfilePic PicUrl={rating.user?.image} />
        </div>
        <div className={classes.UserInfo}>
          <div className={classes.divUsernameInfo}>{rating.user?.name}</div>
          <RatingStar
            ratedStarHandler={(rating: number | null) =>
              ratedUserHandler(rating)
            }
          />
          {console.log(
            `${rating.user?.name} UserRating at RatingList: ${rating.rating}`
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingList;
