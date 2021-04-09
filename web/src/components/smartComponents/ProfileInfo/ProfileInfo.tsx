import React from "react";
import classes from "./ProfileInfo.module.css";

import {
  Subtitle,
  Heading,
  ProfilePic,
  CoverPic,
} from "@dumbComponents/UI/index";
import { Edit } from "@dumbComponents/UI/Icons";

interface Props {
  cover?: string;
  pic?: string;
  name: string;
  role: string;
}

const ProfileInfo: React.FC<Props> = (props) => {
  return (
    <div className={classes.profileInfo}>
      <div className={classes.cover}>
        <CoverPic url="" />
      </div>
      <div className={classes.profilePic}>
        <ProfilePic size="medium" />
      </div>
      <div className={classes.name}>{props.name}</div>
      <div className={classes.role}>{props.role}</div>
    </div>
  );
};

export default ProfileInfo;
