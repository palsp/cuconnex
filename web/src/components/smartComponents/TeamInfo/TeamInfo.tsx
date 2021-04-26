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
    <div className={classes.teamInfo}>
      <div className={classes.cover}>
        <CoverPic url="" />
      </div>
      <div className={classes.teamprofile}>
        <div className={classes.flex}>
          <div className={classes.profilePic}>
            <ProfilePic size="mediumborder" />
          </div>
        </div>
        <div className={classes.namerole}>
          <div className={classes.name}>{props.name}</div>
          {props.isTeamOwner ? (
            <div className={classes.role}>You are team owner</div>
          ) : (
            <div className={classes.role}>Very compatible with you</div>
          )}
        </div>
      </div>
      {props.isTeamOwner ? (
        <div className={classes.sign}>
          <RecruitSign value="Invite member" />
        </div>
      ) : (
        <div className={classes.sign}>
          <RecruitSign value="Request to join" />
        </div>
      )}
    </div>
  );
};

export default TeamInfo;
