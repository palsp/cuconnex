import React from "react";

import {
  Button,
  Heading,
  RecruitSign,
  Subtitle,
} from "@dumbComponents/UI/index";

import { ProfilePic } from "@smartComponents/index";

import classes from "./TeamList.module.css";
import { Ecommerce } from "@dumbComponents/UI/Icons";

interface Props {
  team: {
    name: string;
    event: string;
    status: string;
  };
}

const TeamList: React.FC<Props> = (props) => {
  return (
    <div className={classes.team} data-test="team-list">
      <div className={classes.teamContainer}>
        <div className={classes.leftFlex}>
          <div className={classes.teampic}>
            <ProfilePic />
          </div>
        </div>
        <div className={classes.rightFlex}>
          <div className={classes.teamName}>
            <Heading
              data-test="team-list-name"
              value={props.team ? props.team.name : "test-value"}
              size="small"
            />
          </div>
          <div className={classes.flex}>
            <div className={classes.teamEvent}>
              <Subtitle
                data-test="team-list-event"
                value={props.team ? props.team.event : "test-value"}
                size="small"
              />
            </div>
            <div className={classes.teamStatus}>
              <RecruitSign
                data-test="team-list-status"
                value={props.team.status}
              />
            </div>
          </div>
          <div className={classes.teamFriends}>
            <ProfilePic size="mini" />
            <ProfilePic size="mini" />
            <ProfilePic size="mini" />
            <ProfilePic size="mini" />
            <div className={classes.moreFriends}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamList;
