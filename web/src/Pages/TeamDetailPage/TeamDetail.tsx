import React, { useContext, useEffect, useState } from "react";
import classes from "./TeamDetail.module.css";
import { Link } from "react-router-dom";
import { Heading, Subtitle } from "@dumbComponents/UI/index";
import { ArrowLeft, Close, InviteMember, Mail } from "@icons/index";
import {
  MemberPicList,
  RecruitmentLists,
  TeamActivityLists,
  TeamInfo,
} from "@smartComponents/index";
import mockTeamActivitiesData from "@src/mockData/mockTeamActivitiesData";
import { motion } from "framer-motion";

import containerVariants, {
  IFetchTeam,
  IUser,
  IUserFriend,
  IUserRequest,
} from "@src/models/models";
import { ITeam } from "@src/models/index";
import { UserContext } from "@context/UserContext";
import {
  fetchTeamIncomingNotificationAPI,
  fetchTeamMembersAPI,
  fetchTeamOutgoingNotificationAPI,
  userTeamRelationAPI,
  userTeamRequestAPI,
} from "@src/api";
import RequestPrompt from "./RequestPrompt/RequestPrompt";
import InviteMembersPrompt from "./InviteMembersPrompt/InviteMembersPrompt";

interface Props {
  location: {
    state: {
      team: IFetchTeam;
    };
  };
  history: {
    goBack: () => void;
  };
}

const TeamDetail: React.FC<Props> = (props) => {
  const [teamMembers, setTeamMembers] = useState<IUser[] | []>([]);
  const [pendingMembers, setPendingMembers] = useState<IUser[] | []>([]);
  const [clickTeamDetail, setClickTeamDetail] = useState<boolean>(true);
  const [clickInviteMembers, setClickInviteMembers] = useState<boolean>(false);

  const [incomingTeamNoti, setIncomingTeamNoti] = useState<IUserFriend[] | []>(
    []
  );
  const [relation, setRelation] = useState<string>("");
  useEffect(() => {
    fetchOutgoingTeamNotiHandler();
    fetchTeamMembersHandler();
    fetchRelationHandler();
    fetchIncomingTeamNotiHandler();
  }, []);
  const myTeamName = props.location.state.team.name;
  const fetchOutgoingTeamNotiHandler = async () => {
    const teamOutgoingNotiData = await fetchTeamOutgoingNotificationAPI(
      myTeamName
    );
    console.log(
      "SUCCESS pendingMember",
      teamOutgoingNotiData.data.outgoingRequests.pendingUsers
    );
    setPendingMembers(teamOutgoingNotiData.data.outgoingRequests.pendingUsers);
  };
  const fetchIncomingTeamNotiHandler = async () => {
    const requestData = await fetchTeamIncomingNotificationAPI(
      props.location.state.team.name
    );
    console.log(
      "SUCCESS Incoming team request =",
      requestData.data.incomingRequests.pendingUsers
    );
    setIncomingTeamNoti(requestData.data.incomingRequests.pendingUsers);
  };
  const fetchTeamMembersHandler = async () => {
    const teamMembersData = await fetchTeamMembersAPI(myTeamName);
    console.log("SUCCESS members =", teamMembersData.data.users);
    setTeamMembers(teamMembersData.data.users);
  };
  const fetchRelationHandler = async () => {
    const relationData = await userTeamRelationAPI(myTeamName);
    console.log("SUCCESS relation =", relationData.data);
    setRelation(relationData.data.status);
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
  const inviteMembersClickedHandler = () => {
    setClickInviteMembers(true);
    setClickTeamDetail(false);
  };
  const backClickedHandler = () => {
    setClickInviteMembers(false);
    setClickTeamDetail(true);
    console.log("Status", clickInviteMembers, clickTeamDetail);
  };
  const teamDetailPrompt =
    clickTeamDetail === true ? (
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
            // <div className={classes.closeLeft}>
            //   <Close data-test="team-detail-page-close-left" />
            // </div>
            <div />
          )}

          <div className={classes.head}>
            <Heading data-test="team-detail-page-header" value="Team details" />
          </div>
          {isTeamOwner ? (
            <div />
          ) : (
            // <div className={classes.closeRight}>
            //   <Close data-test="team-detail-page-close-right" />
            // </div>
            <div />
          )}
        </div>

        <div className={classes.info}>
          <div className={classes.profileInfo}>
            <TeamInfo
              fetchRelationHandler={fetchRelationHandler}
              inviteMembersClickedHandler={inviteMembersClickedHandler}
              status={relation}
              name={props.location.state.team.name}
              teamInfo={props.location.state.team}
              isTeamOwner={isTeamOwner}
            />
          </div>
        </div>

        <div className={classes.teamDescription}>
          <Subtitle value="Team Description" bold size="small" color="black" />
          <Heading value="About our team" size="small" />
          <Subtitle
            value={props.location.state.team.description}
            size="small"
            color="black"
          />
          <Heading value="Current Recruitment" size="small" />
          <Subtitle
            value={props.location.state.team.currentRecruitment}
            size="small"
            color="black"
          />
        </div>
        <div className={classes.memberpic}>
          <MemberPicList
            members={teamMembers}
            pendingMembers={pendingMembers}
          />
        </div>
        <div className={classes.activity}>
          <TeamActivityLists activity={mockTeamActivitiesData} />
        </div>
        {isTeamOwner ? (
          <RequestPrompt
            teams={props.location.state.team}
            requests={incomingTeamNoti}
          />
        ) : (
          <div />
        )}
      </motion.div>
    ) : (
      <InviteMembersPrompt
        incomingRequest={incomingTeamNoti}
        backHandler={() => backClickedHandler}
        teams={props.location.state.team}
      />
    );

  return <div>{teamDetailPrompt}</div>;
};

export default TeamDetail;
