import React from "react";
import { motion } from "framer-motion";

import {
  Button,
  Heading,
  RecruitSign,
  Subtitle,
  TeamPic,
} from "@dumbComponents/UI";

import { ProfilePic } from "@smartComponents/index";
import classes from "./MyTeamList.module.css";
import { Ecommerce, Group } from "@dumbComponents/UI/Icons";
import { ITeam } from "@src/models";

interface Props {
  team: ITeam;
  landingexplore?: boolean;
  page?: string;
}

const TeamList: React.FC<Props> = (props) => {
  let cssArrayTeam = null;
  // if (props.landing) {
  //   cssArrayTeam = [classes.landingDiv];
  // } else {
  //   cssArrayTeam = [classes.team];
  // }
  if (props.page === "landing") {
    cssArrayTeam = [classes.landingDiv];
  } else if (props.page === "explore") {
    cssArrayTeam = [classes.explore];
  } else {
    cssArrayTeam = [classes.team];
  }

  return (
    <div className={cssArrayTeam.join(" ")} data-test="team-list">
      <motion.div
        // On Tap - Navigation
        transition={{
          type: "spring",
          delay: 0,
          stiffness: 500,
          damping: 60,
          mass: 1,
        }}
        className={classes.teamContainer}
      >
        <div className={classes.leftFlex}>
          <div className={classes.teampic}>
            {/* <TeamPic/> */}
            {props.landingexplore ? <TeamPic /> : <ProfilePic />}
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
          {props.page === "landing" ? (
            <div className={classes.landingLine}>
              <div className={classes.teamEvent}>
                <Subtitle
                  data-test="team-list-event"
                  value={props.team ? props.team.name : "test-value"}
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
                    value={"" + props.team.lookingForMembers}
                  />
                </div>
              </div>
            </div>
          ) : props.page === "explore" ? (
            <div className={classes.landingLine}>
              <div className={classes.teamEvent}>
                <Subtitle
                  data-test="team-list-event"
                  value={props.team ? props.team.event : "test-value"}
                  size="small"
                />
              </div>
              <div className={classes.flex}>
                <div className={classes.teamEvent}>
                  <Subtitle
                    data-test="team-list-event"
                    value={props.team ? props.team.creatorId : "test-value"}
                    size="small"
                  />

                  {/* <div className={classes.groupAmount}>5</div>
              <div className={classes.groupIcon}>
                <Group />  */}
                </div>
                <div className={classes.teamStatus}>
                  <RecruitSign
                    data-test="team-list-status"
                    value={props.team.lookingForMembers + ""}
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
      </motion.div>
    </div>
  );
};

export default TeamList;
