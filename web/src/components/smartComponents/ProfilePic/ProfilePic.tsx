import React from "react";
import classes from "./ProfilePic.module.css";
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

  if (props.size === "big") {
    cssArray = [classes.profileBig];
  } else if (props.size === "medium") {
    cssArray = [classes.profileMedium];
  } else if (props.size === "mediumborder") {
    cssArray = [classes.profileMediumBorder];
  } else if (props.size === "small") {
    cssArray = [classes.profileSmall];
  } else if (props.size === "mini") {
    cssArray = [classes.profileMini];
  } else {
    cssArray = [classes.profile];
  }

  profileArray = [classes.profilePicDefault];

  if (props.PicUrl) {
    profileArray = [classes.profilePic];
  }

  url = window.location.origin + "/api/users/assets/" + props.PicUrl;

  if (props.previewImage) {
    url = props.PicUrl;
  }

  return (
    <div data-test="profile-pic" className={cssArray.join(" ")}>
      <div className={profileArray.join(" ")}>
        {props.PicUrl ? (
          <img
            src={url}
            className={profileArray.join(" ")}
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
  );
};

export default ProfilePic;
