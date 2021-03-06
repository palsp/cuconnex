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
import { IFetchTeam, IFetchTeams, IUserFriend } from "@src/models";
import { Link } from "react-router-dom";

interface Props {
  team: IFetchTeam;
  landingexplore?: boolean;
  page?: string;
}

const TeamList: React.FC<Props> = (props) => {
  const cssArrayTeam = [classes.default];
  // if (props.landing) {
  //   cssArrayTeam = [classes.landingDiv];
  // } else {
  //   cssArrayTeam = [classes.team];
  // }
  if (props.page === "landing") {
    cssArrayTeam.push(classes.landingDiv);
  } else if (props.page === "explore") {
    cssArrayTeam.push(classes.explore);
  } else {
    cssArrayTeam.push(classes.team);
  }

  return (
    <div className={cssArrayTeam.join(" ")} data-test="team-list">
      <Link
        style={{ textDecoration: "none" }}
        to={{
          pathname: "/teamdetail",
          state: {
            team: props.team,
          },
        }}
      >
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
              {props.landingexplore ? (
                <TeamPic PicUrl={props.team.image} />
              ) : (
                <ProfilePic PicUrl={props.team.image} />
              )}
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
                    value={props.team ? props.team.description : "test-value"}
                    size="small"
                  />
                </div>
                <div className={classes.flex}>
                  <div className={classes.groupAmount}>
                    {props.team.members.length}
                  </div>
                  <div className={classes.groupIcon}>
                    <Group />
                  </div>
                  <div className={classes.teamStatus}>
                    <RecruitSign
                      data-test="team-list-status"
                      value={props.team.lookingForMembers ? "Recruiting" : ""}
                    />
                  </div>
                </div>
              </div>
            ) : props.page === "explore" ? (
              // <div className={classes.landingLine}>
              //   <div className={classes.teamEvent}>
              //     <Subtitle
              //       data-test="team-list-event"
              //       value={props.team ? props.team.name : "test-value"}
              //       size="small"
              //     />
              //   </div>
              //   <div className={classes.flex}>
              //     <div className={classes.teamEvent}>
              //       <Subtitle
              //         data-test="team-list-event"
              //         value={props.team ? props.team.creatorId : "test-value"}
              //         size="small"
              //       />

              //       <div className={classes.groupAmount}>5</div>
              //   <div className={classes.groupIcon}>
              //     <Group />
              //     </div>
              //     <div className={classes.teamStatus}>
              //       <RecruitSign
              //         data-test="team-list-status"
              //         value={props.team.lookingForMembers + ""}
              //       />
              //     </div>
              //   </div>
              // </div>
              <div className={classes.landingLine}>
                <div className={classes.teamEvent}>
                  <Subtitle
                    data-test="team-list-event"
                    value={props.team ? props.team.description : "test-value"}
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
                      value={props.team.lookingForMembers ? "Recruiting" : ""}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className={classes.flex}>
                <div className={classes.teamEvent}>
                  <Subtitle
                    data-test="team-list-event"
                    value={props.team ? props.team.description : "test-value"}
                    size="small"
                  />
                </div>
                <div className={classes.teamStatus}>
                  <RecruitSign
                    data-test="team-list-status"
                    value={props.team.lookingForMembers ? "Recruiting" : ""}
                  />
                </div>
              </div>
            )}
            <div className={classes.teamFriends}>
              {props.team.members.map((user: IUserFriend, index: number) => {
                return <ProfilePic key={index} size="xs" PicUrl={user.image} />;
              })}

              <div className={classes.moreFriends}></div>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default TeamList;
