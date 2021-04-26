import React, { useContext, useEffect, useState } from "react";
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
import { IEventData, ITeam, IUser } from "@src/models";
import { motion } from "framer-motion";
import containerVariants from "@src/models/models";
import { callTeamOfUserAPI } from "@src/api";
import { UserContext } from "@context/UserContext";

const ExplorePage = () => {
  const [hasSearch, setHasSearch] = useState<boolean>(false);
  const [noSearchResult, setNoSearchResult] = useState<boolean>(false);
  const [peopleLists, setPeopleLists] = useState<IUser[]>([]);
  const [teamLists, setTeamLists] = useState<ITeam[]>([]);
  const [currentTeamLists, setCurrentTeamLists] = useState<ITeam[]>([]);
  const [eventLists, setEventLists] = useState<IEventData[]>([]);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    fetchTeamHandler().then((value: ITeam[] | []) =>
      setCurrentTeamLists(value)
    );
  }, []);
  const fetchTeamHandler = async () => {
    const teamData = await callTeamOfUserAPI(userData.id);
    console.log("fetchTeamHandler", teamData);
    return teamData.data.teams;
  };
  const explorePage = hasSearch ? (
    <div className={classes.exploreContent}>
      <Tag />
      <div className={classes.exploreHeading}>
        <Heading value="People" />
      </div>
      <PeopleLists peoplelist={peopleLists} />
      <div className={classes.exploreHeading}>
        <Heading value="Teams" />
      </div>
      {/*Loong's work*/}
      {/* <MyTeamLists page="landing" team={teamLists} /> */}
      <MyTeamLists page="explore" team={mockMyTeamListsData} />
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

      {/*Loong's work*/}
        {/* <MyTeamLists page="landing" team={currentTeamLists} /> */}
        <MyTeamLists page="explore" team={mockMyTeamListsData} />
        <div className={classes.exploreSubtitle}>
          <Subtitle value="Find from your interest..." bold />
        </div>
        <ActivityBoxes activitybox={mockActivityBoxes} />
      </div>
    </>
  );
  return (
    <motion.div variants={containerVariants} exit="exit">
      {/* <Background> */}
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
          {console.log("This is peopleLists", peopleLists)}
          {console.log("This is teamLists", teamLists)}
          {console.log("This is eventLists", eventLists)}

          {explorePage}
        </div>
      {/* </Background> */}
    </motion.div>
  );
};

export default ExplorePage;
