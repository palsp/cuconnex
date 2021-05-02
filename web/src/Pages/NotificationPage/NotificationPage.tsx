import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Heading, Tab } from "@dumbComponents/UI/index";

import { ArrowLeft } from "@icons/index";

import classes from "./NotificationPage.module.css";
import {
  ActivityNotificationLists,
  ConnectionLists,
  TeamInvitationLists,
  TeamRatingLists,
} from "@smartComponents/index";
import { UserContext } from "@context/UserContext";
import mockPositionsInActivityNotification from "@src/mockData/mockPositionsInActivityNotificationData";
import {
  IFetchFriendNotification,
  IFetchFriendsData,
  IFetchTeamNotification,
  IUser,
  IUserFriend,
} from "@src/models";
import {
  callTeamOfUserAPI,
  fetchFriendNotificationAPI,
  fetchFriendReceivedNotificationAPI,
  fetchFriendsDataAPI,
  fetchTeamNotificationAPI,
  fetchTeamOutgoingNotificationAPI,
  fetchUserTeamRequestAPI,
} from "@src/api/apiCalls";
import { isPropertySignature } from "typescript";

import { motion } from "framer-motion";
import containerVariants, {
  IFetchOutgoingTeamNotification,
  IFetchTeam,
  ITeam,
} from "@src/models/models";

const NotificationPage: React.FC = () => {
  const [clickIncoming, setIncoming] = useState(true);
  const [clickOutgoing, setOutgoing] = useState(false);
  const [teamNoti, setTeamNoti] = useState<ITeam[] | []>([]);
  const [outgoingTeamNoti, setOutgoingTeamNoti] = useState<IFetchTeam[] | []>(
    []
  );
  const [friendNoti, setFriendNoti] = useState<IUserFriend[] | []>([]);
  const [myTeamLists, setMyTeamLists] = useState<ITeam[] | []>([]);
  const { userData } = useContext(UserContext);
  const [friendReceivedNoti, setFriendReceivedNoti] = useState<
    IUserFriend[] | []
  >([]);
  useEffect(() => {
    fetchTeamNotiHandler().then((value: ITeam[] | []) => setTeamNoti(value));
    fetchFriendNotiHandler().then((value: IUserFriend[] | []) =>
      setFriendNoti(value)
    );
    fetchFriendReceivedNotiHandler().then((value: IUserFriend[] | []) =>
      setFriendReceivedNoti(value)
    );
    fetchTeamNotiHandler().then((value: ITeam[] | []) => setTeamNoti(value));
    fetchTeamHandler();
    fetchOutgoingTeamNotiHandler();
  }, []);
  const fetchTeamHandler = async () => {
    const teamData = await callTeamOfUserAPI(userData.id);
    console.log("fetchTeamHandler", teamData.data);
    setMyTeamLists(teamData.data.teams);
  };
  const fetchTeamNotiHandler = async () => {
    const teamNotiData = await fetchTeamNotificationAPI();
    console.log("SUCCESS fetchTeamNotiHandler", teamNotiData.data.teams);
    return teamNotiData.data.teams;
  };
  console.log(teamNoti);
  console.log(friendNoti.length);
  const fetchFriendNotiHandler = async () => {
    const friendsData = await fetchFriendNotificationAPI();
    console.log("SUCCESS fetchFriendHandler", friendsData.data.requests);
    return friendsData.data.requests;
  };
  const fetchOutgoingTeamNotiHandler = async () => {
    const teamNotiData = await fetchUserTeamRequestAPI();
    console.log("SUCCESS Outgoing team request =", teamNotiData.data.teams);
    setOutgoingTeamNoti(teamNotiData.data.teams);
  };
  const fetchFriendReceivedNotiHandler = async () => {
    const friendsReceivedData = await fetchFriendReceivedNotificationAPI();
    console.log(
      "SUCCESS fetchFriendHandler",
      friendsReceivedData.data.requests
    );
    return friendsReceivedData.data.requests;
  };
  const incomingButtonHandler = () => {
    setIncoming(true);
    setOutgoing(false);
    console.log("setIncoming");
  };

  const outgoingButtonHandler = () => {
    setIncoming(false);
    setOutgoing(true);
    console.log("setOutgoing");
  };
  let incomingNoti = 0;
  let outgoingNoti = 0;
  if (friendReceivedNoti != undefined) {
    incomingNoti = incomingNoti + friendReceivedNoti.length;
  }
  if (teamNoti != undefined) {
    incomingNoti = incomingNoti + teamNoti.length;
  }
  if (friendNoti != undefined) {
    outgoingNoti = outgoingNoti + friendNoti.length;
  }
  if (outgoingTeamNoti != undefined) {
    outgoingNoti = outgoingNoti + outgoingTeamNoti.length;
  }
  console.log(incomingNoti, outgoingNoti);
  let NotificationsPrompt = null;
  if (clickIncoming === true) {
    NotificationsPrompt = (
      <div className={classes.tabIncoming}>
        <div className={classes.relativeArrow}>
          <Link data-test="Notification-page-back-link" to="/landing">
            <ArrowLeft data-test="Notification-page-arrow-left" />
          </Link>
        </div>
        <div className={classes.head}>
          <Heading data-test="Notification-page-header" value="Requests" />
        </div>
        <div className={classes.tab}>
          <div className={classes.incoming}>
            <Tab
              data-test="Notification-page-Incoming"
              onClick={incomingButtonHandler}
              value="Incoming"
              number={incomingNoti + ""}
            />
          </div>
          <div className={classes.outgoing}>
            <Tab
              data-test="Notification-page-Outgoing"
              onClick={outgoingButtonHandler}
              value="Outgoing"
              number={outgoingNoti + ""}
            />
          </div>
        </div>
        <div className={classes.teamRatingList}>
          <TeamRatingLists teams={myTeamLists} />
        </div>
        <div className={classes.teamInvitationList}>
          <TeamInvitationLists
            data-test="Notification-page-team-invitation-lists"
            teams={teamNoti}
          />
        </div>
        <div className={classes.connectionList}>
          <ConnectionLists
            data-test="Notification-page-team-lists"
            requests={friendReceivedNoti}
          />
        </div>
      </div>
    );
  } else if (clickOutgoing === true) {
    NotificationsPrompt = (
      <div className={classes.tabOutgoing}>
        <div className={classes.relativeArrow}>
          <Link data-test="Notification-page-back-link" to="/landing">
            <ArrowLeft data-test="Notification-page-arrow-left" />
          </Link>
        </div>
        <div className={classes.head}>
          <Heading data-test="Notification-page-header" value="Requests" />
        </div>
        <div className={classes.tab}>
          <div className={classes.incoming}>
            <Tab
              data-test="Notification-page-Incoming"
              onClick={incomingButtonHandler}
              value="Incoming"
              number={incomingNoti + ""}
            />
          </div>
          <div className={classes.outgoing}>
            <Tab
              data-test="Notification-page-Outgoing"
              onClick={outgoingButtonHandler}
              value="Outgoing"
              number={outgoingNoti + ""}
            />
          </div>
        </div>
        <div className={classes.activityList}>
          <ActivityNotificationLists
            data-test="Notification-page-team-lists"
            Memberlist={friendNoti}
            requestedTeamList={outgoingTeamNoti}
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      data-test="Notification-page"
      className={classes.main}
    >
      {NotificationsPrompt}
    </motion.div>
  );
};

export default NotificationPage;
