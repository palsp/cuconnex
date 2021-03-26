import React from "react";
import classes from "./ProfilePic.module.css";

interface Props {
  size?: string;
}
const ProfilePic: React.FC<Props> = (props) => {
  let cssArray = null;
  if (props.size === "big") {
    cssArray = [classes.profileBig];
  } else {
    cssArray = [classes.profile];
  }
  return (
    <div data-test="profile-pic" className={cssArray.join(" ")}>
      <div className={classes.profilePic} />
      {/* <p className={classes.pTag}>Add profile Picture</p> */}
    </div>
  );
};

export default ProfilePic;
