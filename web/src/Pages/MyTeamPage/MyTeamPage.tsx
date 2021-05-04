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
import PageTitle from "@dumbComponents/UI/PageTitle/PageTitle";

interface Props {
  history: {
    goBack: () => void;
  };
}

const MyTeamPage: React.FC<Props> = (props) => {
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

  const goBack = () => {
    props.history.goBack();
  };

  let myteamsPrompt = null;
  if (clickOnGoing === true) {
    myteamsPrompt = (
      <div className={classes.tabOngoing}>
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

  const variants = {
    hidden: {
      opacity: 0.85,
      y: 800,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      y: 800,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      key="myTeamPage"
      initial="hidden"
      animate="visible"
      exit="exit"
      data-test="myteam-page"
      className={classes.page}
    >
      <PageTitle goBack={goBack} size="small-medium" text="My Teams" />
      {myteamsPrompt}
    </motion.div>
  );
};

export default MyTeamPage;
