import React from "react";
import classes from "./ProfilePic.module.css";

const ProfilePic: React.FC = () => {
  return (
    <div data-test="profile-pic" className={classes.profile}>
      <div className={classes.profilePic}>
        <p className={classes.pTag}>Add profile Picture</p>
      </div>
    </div>
  );
};

export default ProfilePic;
