import React from "react";
import classes from "./ProfilePic.module.css";

interface Props {
  size?: string;
  uploadedProfile?: boolean;
}
const ProfilePic: React.FC<Props> = (props) => {
  let cssArray = null;
  let profileArray = null;

  if (props.size === "big") {
    cssArray = [classes.profileBig];
  } else if (props.size === "small") {
    cssArray = [classes.profileSmall];
  } else {
    cssArray = [classes.profile];
  }

  if (props.uploadedProfile == true) {
    profileArray = [classes.profilePic];
  } else {
    profileArray = [classes.profilePicDefault];
  }

  return (
    <div data-test="profile-pic" className={cssArray.join(" ")}>
      <div className={profileArray.join("")} />
      {/* <p className={classes.pTag}>Add profile Picture</p> */}
    </div>
  );
};

export default ProfilePic;
