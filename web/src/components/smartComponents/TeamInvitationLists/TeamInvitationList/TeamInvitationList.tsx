import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Heading,
  RecruitSign,
  Subtitle,
  TeamPic,
} from "@dumbComponents/UI";

import { ProfilePic } from "@smartComponents/index";
import classes from "./TeamInvitationList.module.css";
import { Group } from "@dumbComponents/UI/Icons";
import { fetchTeamDataAPI } from "@src/api";
import { IGetTeam } from "@src/models";

interface Props {
  TeamInvitation: {
    teamPic: string;
    teamName: string;
    event: string;
  };
  name?:string;
}

const TeamInvitationList: React.FC<Props> = (props) => {
  // const [getTeamData, setGetTeamData] = useState<IGetTeam>();
  //  useEffect(() => {
  //   fetchTeamHandler().then((value: IGetTeam) =>
  //      setGetTeamData(value)
  //    );
  // }, []);
  // const fetchTeamHandler = async () => {
  //   const teamData = await fetchTeamDataAPI(props.TeamInvitation.teamName);
  //   console.log("SUCCESS fetchFriendHandler", teamData.data.team);
  //   return teamData.data;
  // };
  
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
              value={props.TeamInvitation.teamName}
              size="small"
            />
          </div>
            <div className={classes.landingLine}>
              <div className={classes.teamEvent}>
                <Subtitle
                  data-test="team-invitation-list-event"
                  value={props.TeamInvitation.event}
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
                    <div className={classes.moreFriends}><p>7+</p></div>
                </div>
            </div>
            <div className={classes.teamStatus}>
                <RecruitSign
                    data-test="team-invitation-list-status"
                    value="Accept"
                />
            </div>
        </div>
    </div>
    </div>
    </div>
  );
};

export default TeamInvitationList;