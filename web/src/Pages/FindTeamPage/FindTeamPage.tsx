import React from "react";
import { Link } from "react-router-dom";
import Heading from "../../components/dumbComponents/UI/Heading/Heading";
import Subtitle from "../../components/dumbComponents/UI/Subtitle/Subtitle";
import ArrowLeft from "../../components/dumbComponents/UI/Icons/ArrowLeft/ArrowLeft";
import ActivityLists from "../../components/smartComponents/ActivityLists/ActivityLists";
import SearchBar from "../../components/smartComponents/Navigation/SearchBar/SearchBar";
import classes from "./FindTeamPage.module.css";

const FindTeamPage: React.FC = () => {
  return (
    <div data-test="find-team-page">
      <div className={classes.divHeading}>
        <div className={classes.divFixed}>
          <div className={classes.relativeArrow}>
            <Link data-test="find-team-page-back-link" to="/">
              <ArrowLeft data-test="find-team-page-arrow-left" />
            </Link>
          </div>
          <Heading
            data-test="find-team-page-header"
            value="Find a team"
            size="medium"
          />
        </div>
      </div>

      <div className={classes.divBody}>
        <div className={classes.divFixedLeftWithPadding}>
          <Heading size="big" value="Let's find the team that matches you" />
        </div>
        <SearchBar
          data-test="find-team-page-search-bar"
          value="Search by activity name"
        />
        <div className={classes.divFixedLeft}>
          <div className={classes.divInfo}>
            <Heading value="Browse" />
          </div>
          <div className={classes.divInfo}>
            <Subtitle value="from activity category" />
          </div>
        </div>
        <ActivityLists data-test="find-team-page-friend-lists" />
      </div>
    </div>
  );
};

export default FindTeamPage;
