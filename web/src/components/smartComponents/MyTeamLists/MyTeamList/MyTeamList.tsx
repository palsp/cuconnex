import React from "react";

import {
  Button,
  Heading,
  ProfilePic,
  RecruitSign,
  Subtitle,
  TeamPic,
} from "@dumbComponents/UI";

import classes from "./MyTeamList.module.css";
import { Ecommerce, Group } from "@dumbComponents/UI/Icons";

interface Props {
  team: {
    name: string;
    event: string;
    status: string;
  };
  landing?: boolean;
}

const TeamList: React.FC<Props> = (props) => {
  let cssArrayTeam = null;
  if (props.landing) {
    cssArrayTeam = [classes.landingDiv];
  } else {
    cssArrayTeam = [classes.team];
  }
  return (
    <div className={cssArrayTeam.join(" ")} data-test="team-list">
      <div className={classes.teamContainer}>
        <div className={classes.leftFlex}>
          <div className={classes.teampic}>
            {props.landing ? <TeamPic /> : <ProfilePic />}
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
          {props.landing ? (
            <div className={classes.landingLine}>
              <div className={classes.teamEvent}>
                <Subtitle
                  data-test="team-list-event"
                  value={props.team ? props.team.event : "test-value"}
                  size="small"
                />
              </div>
              <div className={classes.flex}>
                <div className={classes.groupAmount}>5</div>
                <div className={classes.groupIcon}>
                  <Group />
                </div>
                <div className={classes.teamStatus}>
                  <RecruitSign
                    data-test="team-list-status"
                    value={props.team.status}
                  />
                </div>
              </div>
            </div>
          ) : (
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
          )}

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
