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

  if (props.uploadedProfile === true) {
    // console.log("here");
    console.log("src: ", props.PicUrl);
    profileArray = [classes.profilePic];
  }

  return (
    <div data-test="profile-pic" className={cssArray.join(" ")}>
      <div className={profileArray.join(" ")}>
        {props.PicUrl ? (
          <img
            src={props.PicUrl}
            style={{
              objectFit: "cover",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
            }}
            alt="profilepic"
          />
        ) : (
          ""
        )}
        {/* <p className={classes.pTag}>Add profile Picture</p> */}
      </div>
    </div>
  );
};

export default ProfilePic;
