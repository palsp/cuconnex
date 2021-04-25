import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Heading, Tab } from "@dumbComponents/UI/index";

import { ArrowLeft } from "@icons/index";

import { MyTeamLists } from "@smartComponents/index";

import classes from "./MyTeamPage.module.css";
import mockMyTeamListsData from "@src/mockData/mockMyTeamListsData";
import { motion } from "framer-motion";

import containerVariants from "@src/models/models";

import { UserContext } from "@context/UserContext";

import { fetchTeamNotificationAPI } from "@api/index";

const MyTeamPage: React.FC = () => {
  const [onGoing, setOngoing] = useState(true);

  // const { setTeamData } = useContext(UserDataContext);

  // const fetchTeamHandler = async () => {
  //   try {
  //     const teamData = await fetchTeamNotificationAPI();
  //     console.log("fetchTeamHandler", teamData)
  //   }
  // }

  // useEffect(() => {
  //   fetchTeamHandler();
  // }, []);

  const ongoingButtonHandler = () => {
    setOngoing(true);
    console.log("setOngoing");
  };

  const finishedButtonHandler = () => {
    setOngoing(false);
    console.log("setFinished");
  };

  let myteamsPrompt = null;
  if (onGoing === true) {
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
              onClick={ongoingButtonHandler}
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
            team={mockMyTeamListsData}
          />
        </div>
      </div>
    );
  } else if (onGoing === false) {
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
              onClick={ongoingButtonHandler}
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
            team={mockMyTeamListsData}
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
