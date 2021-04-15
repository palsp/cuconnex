import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Heading, Tab } from "@dumbComponents/UI/index";

import { ArrowLeft } from "@icons/index";

import { MyTeamLists } from "@smartComponents/index";

import classes from "./MyTeamPage.module.css";
import mockMyTeamListsData from "@src/mockData/mockMyTeamListsData";

const MyTeamPage: React.FC = () => {
  const [clickOngoing, setOngoing] = useState(true);
  const [clickFinished, setFinished] = useState(false);

  const ongoingButtonHandler = () => {
    setOngoing(true);
    setFinished(false);
    console.log("setOngoing");
  };

  const finishedButtonHandler = () => {
    setOngoing(false);
    setFinished(true);
    console.log("setFinished");
  };

  let myteamsPrompt = null;
  if (clickOngoing === true) {
    myteamsPrompt = (
      <div className={classes.tabOngoing}>
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
          <MyTeamLists data-test="myteam-page-team-lists" team={mockMyTeamListsData} />
        </div>
      </div>
    );
  } else if (clickFinished === true) {
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
          <MyTeamLists data-test="myteam-page-team-lists" team={mockMyTeamListsData} />
        </div>
      </div>
    );
  }

  return (
    <div data-test="myteam-page" className={classes.main}>
      {myteamsPrompt}
    </div>
  );
};

export default MyTeamPage;
