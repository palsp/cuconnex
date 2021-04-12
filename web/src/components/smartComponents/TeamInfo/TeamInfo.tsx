import React from "react";
import classes from "./TeamInfo.module.css";

import {
  Subtitle,
  Heading,
  CoverPic,
  RecruitSign,
} from "@dumbComponents/UI/index";
import { ProfilePic } from "@smartComponents/index";

interface Props {
  cover?: string;
  pic?: string;
  name: string;
  isTeamOwner: boolean;
}

const TeamInfo: React.FC<Props> = (props) => {
  return (
    <div className={classes.profileInfo}>
      <div className={classes.cover}>
        <CoverPic url="" />
      </div>
      <div className={classes.teamprofile}>
        <div className={classes.profilePic}>
          <ProfilePic size="mediumborder" />
        </div>
        <div className={classes.namerole}>
          <div className={classes.name}>{props.name}</div>
          {props.isTeamOwner ? (
            <div className={classes.role}>You are team owner</div>
          ) : (
            <div />
          )}
        </div>
      </div>
      {props.isTeamOwner ? (
        <div className={classes.sign}>
          <RecruitSign value="Invite member" />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default TeamInfo;
