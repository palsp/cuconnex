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
import mockEventLists from "@src/mockData/mockEventLists";
import mockMyTeamListsData from "@src/mockData/mockMyTeamListsData";
import mockActivityBoxes from "@src/mockData/mockActivitiesBoxes";
import { mockPeopleLists } from "@src/mockData";

const ExplorePage = () => {
  const [hasSearch, setHasSearch] = useState<boolean>(false);
  const [noSearchResult, setNoSearchResult] = useState<boolean>(false);
  const [peopleLists, setPeopleLists] = useState([]);
  const [teamLists, setTeamLists] = useState([]);
  const [eventLists, setEventLists] = useState([]);

  const explorePage = hasSearch ? (
    <div className={classes.exploreContent}>
      <Tag />
      <div className={classes.exploreHeading}>
        <Heading value="People" />
      </div>
      <PeopleLists peoplelist={mockPeopleLists} />
      <div className={classes.exploreHeading}>
        <Heading value="Teams" />
      </div>
      <MyTeamLists page="landing" team={mockMyTeamListsData} />
      <div className={classes.exploreHeading}>
        <Heading value="Events" />
      </div>
      <EventLists events={mockEventLists} />
    </div>
  ) : (
    <>
      <div className={classes.exploreContent}>
        <div className={classes.exploreSubtitle}>
          <Subtitle value="Suggested for you" bold />
        </div>
        <MyTeamLists page="landing" team={mockMyTeamListsData} />
        <div className={classes.exploreSubtitle}>
          <Subtitle value="Find from your interest..." bold />
        </div>
        <ActivityBoxes activitybox={mockActivityBoxes} />
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
          <SearchBar
            setHasSearch={setHasSearch}
            setNoSearchResult={setNoSearchResult}
            setPeopleLists={setPeopleLists}
            setTeamLists={setTeamLists}
            setEventLists={setEventLists}
            value="Explore"
          />
        </div>
        {explorePage}
      </div>
    </Background>
  );
};

export default ExplorePage;
