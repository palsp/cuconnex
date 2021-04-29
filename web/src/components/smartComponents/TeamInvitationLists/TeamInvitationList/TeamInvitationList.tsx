import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Heading, RecruitSign, Subtitle, TeamPic } from "@dumbComponents/UI";

import { ProfilePic } from "@smartComponents/index";
import classes from "./TeamInvitationList.module.css";
import { Group } from "@dumbComponents/UI/Icons";
import {
  fetchTeamDataAPI,
  fetchTeamMembersAPI,
  responseTeamInvitationAPI,
} from "@src/api";
import {
  IGetTeam,
  ITeam,
  ITeamMembers,
  IUser,
  IUserResponse,
} from "@src/models";

interface Props {
  teams: ITeam;
}

const TeamInvitationList: React.FC<Props> = (props) => {
  const inviteResponseHandler = async (userResponse: IUserResponse) => {
    try {
      const resultResponse = await responseTeamInvitationAPI(userResponse);
      console.log(
        "Successfully sent a response to the target team",
        resultResponse.data
      );
    } catch (e) {
      console.log("ERRORS occured while sent a response to the target team", e);
    }
  };
  return (
    <div className={classes.teamInvitationList}>
      <div className={classes.teamContainer}>
        <div className={classes.leftFlex}>
          <div className={classes.teampic}>
            <TeamPic />
          </div>
        </div>
        <div className={classes.rightFlex}>
          <div className={classes.teamName}>
            <Heading
              data-test="team-invitation-list-name"
              value={props.teams.name}
              size="small"
            />
          </div>
          <div className={classes.landingLine}>
            <div className={classes.teamEvent}>
              <Subtitle
                data-test="team-invitation-list-event"
                value={props.teams.description}
                size="small"
              />
            </div>
            <div className={classes.flex}>
              <div className={classes.groupAmount}>5</div>
              <div className={classes.groupIcon}>
                <Group />
              </div>
              <div className={classes.teamFriends}>
                <ProfilePic size="mini" />
                <ProfilePic size="mini" />
                <div className={classes.moreFriends}>
                  <p>7+</p>
                </div>
              </div>
            </div>
            <div className={classes.teamStatus}>
              <div
                onClick={() => {
                  const response: IUserResponse = {
                    teamName: props.teams.name,
                    newStatusFromUser: "Accept",
                  };
                  inviteResponseHandler(response);
                }}
              >
                <RecruitSign
                  data-test="team-invitation-list-status"
                  value="Accept"
                />
              </div>
              <div
                onClick={() => {
                  const response: IUserResponse = {
                    teamName: props.teams.name,
                    newStatusFromUser: "Reject",
                  };
                  inviteResponseHandler(response);
                }}
              >
                <RecruitSign
                  data-test="team-invitation-list-status"
                  value="Reject"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamInvitationList;
