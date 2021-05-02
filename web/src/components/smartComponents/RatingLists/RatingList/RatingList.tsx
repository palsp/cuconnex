import React from "react";
import { ProfilePic } from "@smartComponents/index";
import { RatingStar } from "@dumbComponents/UI/index";
import classes from "./RatingList.module.css";
import { IUser } from "@models/index";
interface Props {
  member: IUser;
}
const RatingList: React.FC<Props> = (props) => {
  return (
    <div className={classes.ratingList}>
      <div className={classes.divRatingList}>
        <div>
          {/* <ProfilePic PicUrl={props.members.image} /> */}
          <ProfilePic PicUrl={props.member?.image} />
        </div>
        <div className={classes.UserInfo}>
          <div className={classes.divUsernameInfo}>{props.member?.name}</div>
          <RatingStar></RatingStar>
        </div>
      </div>
    </div>
  );
};

export default RatingList;
