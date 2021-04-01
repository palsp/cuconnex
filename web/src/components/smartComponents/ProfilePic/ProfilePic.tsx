import React from "react";
import classes from "./ProfilePic.module.css";
interface Props {
  size?: string;
  uploadedProfile?: boolean;
  PicUrl?: string;
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
    console.log("here");
    console.log("src: ", props.PicUrl);
    profileArray = [classes.profilePic];
  } else {
    console.log("not upload");
    profileArray = [classes.profilePicDefault];
  }

  return (
    <div data-test="profile-pic" className={cssArray.join(" ")}>
      <div className={profileArray.join("")}></div>
      {/* <img src={"../../../assets/tempProfile.png"} />; */}
      {/* <p className={classes.pTag}>Add profile Picture</p> */}
    </div>
  );
};

export default ProfilePic;
