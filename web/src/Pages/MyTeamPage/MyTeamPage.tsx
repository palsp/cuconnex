import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Heading, Tab } from "@dumbComponents/UI/index";

import { ArrowLeft } from "@icons/index";

import { MyTeamLists } from "@smartComponents/index";

import classes from "./MyTeamPage.module.css";
import mockMyTeamListsData from "@src/mockData/mockMyTeamListsData";
import { motion } from "framer-motion";

import containerVariants, { ITeam } from "@src/models/models";

import { UserContext } from "@context/UserContext";

import { callTeamOfUserAPI, fetchTeamNotificationAPI } from "@api/index";

const MyTeamPage: React.FC = () => {

  const [teamLists, setTeamLists] = useState<ITeam[] | []>([]);
  const [clickOngoing, setOngoing] = useState(true);
  const [clickFinished, setFinished] = useState(false);
  const { userData } = useContext(UserContext);
  const fetchTeamHandler = async () => {
    const teamData = await callTeamOfUserAPI(userData.id);
    console.log("fetchTeamHandler", teamData);
    return teamData.data.teams;
  };


  useEffect(() => {
    fetchTeamHandler().then((value: ITeam[] | []) =>
    setTeamLists(value)
  );
  }, []);

  const ButtonHandler = () => {
    setOngoing(true);
    console.log("setOngoing");
  };

  const finishedButtonHandler = () => {
    setOngoing(false);
    console.log("setFinished");
  };

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
            team={teamLists}
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
            team={teamLists}
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
