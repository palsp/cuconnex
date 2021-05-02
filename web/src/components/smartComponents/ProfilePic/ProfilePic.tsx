import React from "react";
import classes from "./ProfilePic.module.css";
import tempProfile from "@assets/tempProfile.png";
interface Props {
  size?: string;
  uploadedProfile?: boolean;
  previewImage?: boolean;
  PicUrl?: string;
}
const ProfilePic: React.FC<Props> = (props) => {
  let cssArray = null;
  let profileArray = null;
  let url = null;

  if (props.size === "xl") {
    //xl big
    cssArray = [classes.profileBig];
  } else if (props.size === "l") {
    //l medium
    cssArray = [classes.profileMedium];
  } else if (props.size === "lwithborder") {
    //lwithborder mediumborder
    cssArray = [classes.profileMediumBorder];
  } else if (props.size === "m") {
    //m small
    cssArray = [classes.profileSmall];
  } else if (props.size === "s") {
    //s smallMedium
    cssArray = [classes.profileSmallMedium];
  } else if (props.size === "xs") {
    //xs xs
    cssArray = [classes.profileMini];
  } else {
    cssArray = [classes.profile];
  }

  profileArray = [classes.profilePicDefault];

  if (props.PicUrl) {
    profileArray = [classes.profilePic];
  }
  url = "https://www.cu-connex.com/api/users/" + props.PicUrl;
  // url = window.location.origin + "/api/users/" + props.PicUrl;

  if (props.previewImage) {
    url = props.PicUrl;
  }

  return (
    // <div className={classes.test}>
    <div data-test="profile-pic" className={cssArray.join(" ")}>
      <div className={profileArray.join(" ")}>
        {props.PicUrl ? (
          <img
            src={url}
            className={profileArray.join(" ")}
            // onError={tempProfile}
            // style={{
            //   objectFit: "cover",
            //   width: "200px",
            //   height: "200px",
            //   borderRadius: "50%",
            // }}
            alt="profilepic"
          />
        ) : (
          ""
        )}
      </div>
    </div>
    // </div>
  );
};

export default ProfilePic;
