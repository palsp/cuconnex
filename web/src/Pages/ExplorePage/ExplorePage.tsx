import React, { useState } from "react";
import classes from "./ExplorePage.module.css";
import {
  ActivityBoxes,
  EventLists,
  MyTeamLists,
  PeopleLists,
  SearchBar,
} from "@smartComponents/index";
import { ArrowLeft } from "@icons/index";
import { Background, Heading, Subtitle, Tag } from "@dumbComponents/UI";
import { Link } from "react-router-dom";

const ExplorePage = () => {
  const [hasSearch, setHasSearch] = useState<boolean>(true);
  const explorePage = hasSearch ? (
    <div className={classes.exploreContent}>
      <Tag />
      <div className={classes.exploreHeading}>
        <Heading value="People" />
      </div>
      <PeopleLists />
      <div className={classes.exploreHeading}>
        <Heading value="Teams" />
      </div>
      <MyTeamLists page="landing" />
      <div className={classes.exploreHeading}>
        <Heading value="Events" />
      </div>
      <EventLists />
    </div>
  ) : (
    <>
      <div className={classes.exploreContent}>
        <div className={classes.exploreSubtitle}>
          <Subtitle value="Suggested for you" bold />
        </div>
        <MyTeamLists page="landing" />
        <div className={classes.exploreSubtitle}>
          <Subtitle value="Find from your interest..." bold />
        </div>
        <ActivityBoxes />
      </div>
    </>
  );
  return (
    <Background>
      {/* Background has display: flex so this div is for that */}

      <div>
        <div className={classes.exploreHeader}>
          <Link to="/landing">
            <ArrowLeft />
          </Link>
          <SearchBar value="Explore" />
        </div>
        {explorePage}
      </div>
    </Background>
  );
};

export default ExplorePage;
