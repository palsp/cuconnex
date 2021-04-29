import React, { useContext, useEffect, useState } from "react";
import classes from "./TeamDetail.module.css";
import { Link } from "react-router-dom";
import { Heading } from "@dumbComponents/UI/index";
import { ArrowLeft, Close } from "@icons/index";
import {
  MemberPicList,
  RecruitmentLists,
  TeamActivityLists,
  TeamInfo,
} from "@smartComponents/index";
import mockTeamActivitiesData from "@src/mockData/mockTeamActivitiesData";
import { motion } from "framer-motion";

import containerVariants, { IUser } from "@src/models/models";
import { ITeam } from "@src/models/index";
import { UserContext } from "@context/UserContext";
import {
  fetchTeamMembersAPI,
  fetchTeamOutgoingNotificationAPI,
} from "@src/api";

interface Props {
  location: {
    state: {
      team: ITeam;
    };
  };
  history: {
    goBack: () => void;
  };
}

const TeamDetail: React.FC<Props> = (props) => {
  const [teamMembers, setTeamMembers] = useState<IUser[] | []>([]);
  const [pendingMembers, setPendingMembers] = useState<IUser[] | []>([]);
  useEffect(() => {
    fetchOutgoingTeamNotiHandler();
    fetchTeamMembersHandler();
  }, []);
  const myTeamName = props.location.state.team.name;
  const fetchOutgoingTeamNotiHandler = async () => {
    const teamOutgoingNotiData = await fetchTeamOutgoingNotificationAPI(
      myTeamName
    );
    console.log(
      "SUCCESS fetchOutgoingTeamNotiHandler",
      teamOutgoingNotiData.data.pendingUsers
    );
    setPendingMembers(teamOutgoingNotiData.data.pendingUsers);
  };
  const fetchTeamMembersHandler = async () => {
    const teamMembersData = await fetchTeamMembersAPI(myTeamName);
    console.log("SUCCESS fetchTeamMembersHandler", teamMembersData);
    setTeamMembers(teamMembersData.data.users);
  };
  console.log(pendingMembers, "these guy are invited");
  const { userData } = useContext(UserContext);
  // Is user be team owner ?
  let isTeamOwner = false;
  if (userData.id === props.location.state.team.creatorId) {
    isTeamOwner = true;
  }
  // Is team already exist ? (create team process)
  const isTeamExist = true;

  const goBackPreviousPageHandler = () => {
    props.history.goBack();
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={classes.TeamDetail}
    >
      <div className={classes.header}>
        {isTeamExist ? (
          <div
            onClick={goBackPreviousPageHandler}
            className={classes.relativeArrow}
          >
            <ArrowLeft data-test="team-detail-page-arrow-left" />
          </div>
        ) : (
          <div className={classes.closeLeft}>
            <Close data-test="team-detail-page-close-left" />
          </div>
        )}
        <div className={classes.head}>
          <Heading data-test="team-detail-page-header" value="Team details" />
        </div>
        {isTeamOwner ? (
          <div />
        ) : (
          <div className={classes.closeRight}>
            <Close data-test="team-detail-page-close-right" />
          </div>
        )}
      </div>

      <div className={classes.info}>
        <div className={classes.profileInfo}>
          {/* <TeamInfo name="Suki Tee Noi" isTeamOwner={isTeamOwner} /> */}
          <TeamInfo
            name={props.location.state.team.name}
            isTeamOwner={isTeamOwner}
          />
        </div>
      </div>

      <div className={classes.recruitment}>
        <RecruitmentLists />
      </div>

      <div className={classes.memberpic}>
        <MemberPicList members={teamMembers} pendingMembers={pendingMembers} />
      </div>

      <div className={classes.activity}>
        <TeamActivityLists activity={mockTeamActivitiesData} />
      </div>
    </motion.div>
  );
};

export default TeamDetail;
