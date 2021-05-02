import React from "react";
import classes from "./ProfileInfo.module.css";

import { Subtitle, Heading, CoverPic } from "@dumbComponents/UI/index";
import { Edit } from "@dumbComponents/UI/Icons";

import { ProfilePic } from "@smartComponents/index";
interface Props {
  cover?: string;
  image?: string;
  name: string;
  role: string;
}

const ProfileInfo: React.FC<Props> = (props) => {
  return (
    <div className={classes.profileInfo}>
      <div className={classes.cover}>
        <CoverPic url="" />
      </div>
      <div className={classes.flex}>
        <div className={classes.profilePic}>
          <ProfilePic size="lwithborder" PicUrl={props.image} />
        </div>
      </div>
      <div className={classes.name}>{props.name}</div>
      <div className={classes.role}>{props.role}</div>
    </div>
  );
};

export default ProfileInfo;
