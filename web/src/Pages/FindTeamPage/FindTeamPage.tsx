import React from "react";
import { Link } from "react-router-dom";

import { Heading, Subtitle } from "@dumbComponents/UI/index";
import { ActivityLists, SearchBar } from "@smartComponents/index";
import { ArrowLeft } from "@icons/index";

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
          <Heading
            size="medium"
            color="black"
            value="Let's find the team that matches you"
          />
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
