import React, { useState, useEffect } from "react";
import { ProfilePic } from "@smartComponents/index";
import { RatingStar } from "@dumbComponents/UI/index";
import classes from "./RatingList.module.css";
import { IUser, IRateUser } from "@models/index";
import { rateUserAPI } from "@api/index";

interface Props {
  member: IUser;
  submit: boolean;
  // ratedUserHandler: (rating: number | null) => void;
}

const RatingList: React.FC<Props> = (props) => {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [submit, setSubmit] = useState<boolean>(false);
  const ratedUserHandler = (rating: number | null) => {
    setUserRating(rating);
  };

  useEffect(() => {
    setSubmit(props.submit);
    console.log(props.submit);
    console.log("haha");
  });

  const voteSubmittedHandler = async () => {
    const ratedUser: IRateUser = {
      rateeId: props.member?.id,
      ratings: userRating,
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

  // if (props.submit) {
  //   console.log("voteSubmittedHandler Called");
  //   voteSubmittedHandler;
  // }
  return (
    <div className={classes.ratingList}>
      <div className={classes.divRatingList}>
        <div>
          <ProfilePic PicUrl={props.member?.image} />
        </div>
        <div className={classes.UserInfo}>
          <div className={classes.divUsernameInfo}>{props.member?.name}</div>
          <RatingStar
            ratedStarHandler={(rating: number | null) =>
              ratedUserHandler(rating)
            }
          ></RatingStar>
          {console.log(
            `${props.member?.name} UserRating at RatingList: ${userRating}`
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingList;
