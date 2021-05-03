import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Heading, Tab } from "@dumbComponents/UI/index";

import { ArrowLeft } from "@icons/index";

import { MyTeamLists } from "@smartComponents/index";

import classes from "./MyTeamPage.module.css";
import mockMyTeamListsData from "@src/mockData/mockMyTeamListsData";
import { motion } from "framer-motion";

import containerVariants, { IFetchTeam } from "@src/models/models";

import { UserContext } from "@context/UserContext";

import { callTeamOfUserAPI, fetchTeamNotificationAPI } from "@api/index";

const MyTeamPage: React.FC = () => {
  const [teamLists, setTeamLists] = useState<IFetchTeam[] | []>([]);
  let ongoingTeamLists: IFetchTeam[] | [] = [];
  let finishedTeamLists: IFetchTeam[] | [] = [];
  const [clickOnGoing, setOngoing] = useState(true);
  const [clickFinished, setFinished] = useState(false);
  const { userData } = useContext(UserContext);
  useEffect(() => {
    fetchTeamHandler();
  }, []);
  const fetchTeamHandler = async () => {
    const teamData = await callTeamOfUserAPI(userData.id);
    console.log("fetchTeamHandler", teamData);
    setTeamLists(teamData.data.teams);
  };

  const onGoingButtonHandler = () => {
    setOngoing(true);
    console.log("setOngoing");
  };

  const finishedButtonHandler = () => {
    setOngoing(false);
    console.log("setFinished");
  };
  console.log(teamLists.length);
  for (let i = 0; i < teamLists.length; i++) {
    if (teamLists[i].lookingForMembers) {
      ongoingTeamLists = [...ongoingTeamLists, teamLists[i]];
    } else {
      finishedTeamLists = [...finishedTeamLists, teamLists[i]];
    }
  }

  let myteamsPrompt = null;
  if (clickOnGoing === true) {
    myteamsPrompt = (
      <div className={classes.tabOngoing}>
        <div className={classes.relativeArrow}>
          <Link
            data-test="myteam-page-back-link"
            to={{ pathname: "/landing", state: { hamburgerOn: true } }}
          >
            <ArrowLeft data-test="myteam-page-arrow-left" />
          </Link>
        </div>
        <div className={classes.head}>
          <Heading data-test="myteam-page-header" value="My teams" />
        </div>
        <div className={classes.tab}>
          <div className={classes.ongoing}>
            <Tab
              data-test="myteam-page-ongoing"
              onClick={onGoingButtonHandler}
              value="Ongoing"
            />
          </div>
          <div className={classes.finished}>
            <Tab
              data-test="myteam-page-ongoing"
              onClick={finishedButtonHandler}
              value="Finished"
            />
          </div>
        </div>
        <div className={classes.teamList}>
          <MyTeamLists
            data-test="myteam-page-team-lists"
            team={ongoingTeamLists}
          />
        </div>
      </div>
    );
  } else if (clickOnGoing === false) {
    myteamsPrompt = (
      <div className={classes.tabFinished}>
        <div className={classes.relativeArrow}>
          <Link data-test="myteam-page-back-link" to="/landing">
            <ArrowLeft data-test="myteam-page-arrow-left" />
          </Link>
        </div>
        <div className={classes.head}>
          <Heading data-test="myteam-page-header" value="My teams" />
        </div>
        <div className={classes.tab}>
          <div className={classes.ongoing}>
            <Tab
              data-test="myteam-page-ongoing"
              onClick={onGoingButtonHandler}
              value="Ongoing"
            />
          </div>
          <div className={classes.finished}>
            <Tab
              data-test="myteam-page-ongoing"
              onClick={finishedButtonHandler}
              value="Finished"
            />
          </div>
        </div>
        <div className={classes.teamList}>
          <MyTeamLists
            data-test="myteam-page-team-lists"
            team={finishedTeamLists}
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      exit="exit"
      data-test="myteam-page"
      className={classes.main}
    >
      {myteamsPrompt}
    </motion.div>
  );
};

export default MyTeamPage;
