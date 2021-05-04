import React, { useState, useEffect } from "react";
import { ProfilePic } from "@smartComponents/index";
import { RatingStar } from "@dumbComponents/UI/index";
import classes from "./RatingList.module.css";
import { IUser, IRateUser } from "@models/index";
import { rateUserAPI } from "@api/index";
import { Rating } from "@pages/RatingPage/RatingPage";

interface Props {
  rating: Rating;
  index: number;
  // ratedUserHandler: (rating: number | null) => void;
}

const RatingList: React.FC<Props> = (props) => {
  const { rating, index } = props;
  console.log("RatingList: ", rating, "index", props.index);

  const ratedUserHandler = (score: number, key: number) => {
    console.log("testfucker", rating);
    rating.setRating((prev) => {
      const newArr = prev;
      console.log("key", key);
      newArr[key].rating = score;
      console.log(`RatingList ratedUserHandler user:${key}: `, score);
      return newArr;
    });
  };

  return (
    <div
      className={classes.ratingList}
      onClick={() => console.log(rating.ratingId)}
    >
      <div className={classes.divRatingList}>
        <div>
          <ProfilePic PicUrl={rating.user?.image} />
        </div>
        <div className={classes.userInfo}>
          <div className={classes.divUsernameInfo}>{rating.user?.name}</div>
          <RatingStar
            rating={rating}
            index={index}
            ratedStarHandler={ratedUserHandler}
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
