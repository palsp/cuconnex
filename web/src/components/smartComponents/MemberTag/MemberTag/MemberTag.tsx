import ProfilePic from "@smartComponents/ProfilePic/ProfilePic";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./MemberTag.module.css";
interface Props {
  members: {
    name: string,
    role: string,
    profilePic: string,
    selected:boolean,
  };
}
const MemberTag: React.FC<Props> = (props) => {
  return (
    <div className={classes.mainDiv}>
        <ProfilePic></ProfilePic>
        <div className={classes.textDiv}>
          <div className={classes.nameDiv}>{props.members.name}</div>
          <div className={classes.roleDiv}>{props.members.role}</div>
        </div>
    </div>
  );
};

export default MemberTag;
