import React, { useState, useEffect } from "react";
import { ProfilePic } from "@smartComponents/index";
import { RatingStar } from "@dumbComponents/UI/index";
import classes from "./RatingList.module.css";
import { IUser, IRateUser } from "@models/index";
import { rateUserAPI } from "@api/index";
import { Rating } from "@pages/RatingPage/RatingPage";

interface Props {
  rating: Rating;
  submit: boolean;
  key: number;
  // ratedUserHandler: (rating: number | null) => void;
}

const RatingList: React.FC<Props> = (props) => {
  const { rating, key } = props;
  console.log("RatingList: ", rating);
  const ratedUserHandler = (score: number | null) => {
    rating.setRating((prev) => {
      prev[key].rating = score;
      return prev;
    });
  };

  // useEffect(() => {
  //   setSubmit(props.submit);
  //   console.log(`Submit state at RatingList: ${props.submit}`);
  // });

  const voteSubmittedHandler = async () => {
    const ratedUser: IRateUser = {
      rateeId: rating.user.id,
      ratings: rating.rating,
    };
    console.log(
      `User ID: ${ratedUser.rateeId}, User Rating: ${ratedUser.ratings}`
    );
    try {
      const resultResponse = await rateUserAPI(ratedUser);
      console.log("Successfully rate a user in the team", resultResponse.data);
    } catch (e) {
      console.log(
        "ERRORS occured while sent a response to the user in the team",
        e
      );
    }
  };

  if (props.submit) {
    console.log("voteSubmittedHandler Called");
    voteSubmittedHandler();
  }

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
          ></RatingStar>
          {console.log(
            `${rating.user?.name} UserRating at RatingList: ${rating.rating}`
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingList;
