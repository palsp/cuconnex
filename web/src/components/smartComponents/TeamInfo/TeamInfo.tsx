import React from "react";
import classes from "./TeamInfo.module.css";

import {
  Subtitle,
  Heading,
  CoverPic,
  RecruitSign,
} from "@dumbComponents/UI/index";
import { ProfilePic } from "@smartComponents/index";
import { IUserRequest } from "@src/models";
import { userTeamRequestAPI } from "@src/api";

interface Props {
  cover?: string;
  pic?: string;
  name: string;
  isTeamOwner: boolean;
  status: string;
}

const TeamInfo: React.FC<Props> = (props) => {
  const userRequestHandler = async (request: IUserRequest) => {
    const resultTeam = await userTeamRequestAPI(request);
    console.log("Successfully sent a POST request to teams", resultTeam);
  };
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
      ) : props.status === null ? (
        <div
          onClick={() => {
            const name = {
              teamName: props.name,
            };
            userRequestHandler(name);
          }}
          className={classes.sign}
        >
          <RecruitSign value="Request to join" />
        </div>
      ) : (
        <div />
      )}
      {props.status === "Accept" ? (
        <div className={classes.sign}>
          <RecruitSign value="Accepted" />
        </div>
      ) : props.status === "Reject" ? (
        <div className={classes.sign}>
          <RecruitSign value="Reject" />
        </div>
      ) : props.status === "Pending" ? (
        <div className={classes.sign}>
          <RecruitSign value="Pending" />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default TeamInfo;
