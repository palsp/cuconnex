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
import { Heading, Subtitle, Tag } from "@dumbComponents/UI";
import { Link } from "react-router-dom";
import mockEventLists from "@src/mockData/mockEventLists";
import mockActivityBoxes from "@src/mockData/mockActivitiesBoxes";
import { IEventData, IUser } from "@src/models";
import { motion } from "framer-motion";
import containerVariants, { IFetchTeam } from "@src/models/models";
import { UserContext } from "@context/UserContext";
import { callTeamOfUserAPI } from "@src/api";

const ExplorePage = () => {
  const [hasSearch, setHasSearch] = useState<boolean>(false);
  const [noSearchResult, setNoSearchResult] = useState<boolean>(false);
  const [peopleLists, setPeopleLists] = useState<IUser[]>([]);
  const [teamLists, setTeamLists] = useState<IFetchTeam[]>([]);
  const [eventLists, setEventLists] = useState<IEventData[]>([]);
  const [myTeamLists, setMyTeamLists] = useState<IFetchTeam[] | []>([]);
  const { userData } = useContext(UserContext);
  useEffect(() => {
    fetchTeamHandler();
  }, []);
  const fetchTeamHandler = async () => {
    const teamData = await callTeamOfUserAPI(userData.id);
    console.log("fetchTeamHandler", teamData.data);
    setMyTeamLists(teamData.data.teams);
  };

  const explorePage = !hasSearch ? (
    <>
      <div className={classes.exploreContent}>
        <div className={classes.exploreSubtitle}>
          <Subtitle value="Suggested for you" bold />
        </div>

        {/*Loong's work*/}
        {/* <MyTeamLists page="landing" team={currentTeamLists} /> */}
        <MyTeamLists page="explore" team={myTeamLists} />
        <div className={classes.exploreSubtitle}>
          <Subtitle value="Find from your interest..." bold />
        </div>
        <ActivityBoxes activitybox={mockActivityBoxes} />
      </div>
    </>
  ) : noSearchResult ? (
    <div className={classes.exploreContent}>
      <div className={classes.exploreHeading}>
        <Heading value="No Matches Found" />
      </div>
      <div style={{ marginTop: "-4vh" }} className={classes.exploreHeading}>
        <Subtitle value="Please try another search" />
      </div>
      <div className={classes.exploreSubtitle}>
        <Subtitle value="Try something that might interest you" bold />
      </div>
      <div className={classes.exploreSubtitle}>
        <Subtitle value="Find from your interest..." bold />
      </div>
      <ActivityBoxes activitybox={mockActivityBoxes} />
    </div>
  ) : (
    <>
      <Tag />
      <div className={classes.exploreContent}>
        <div className={classes.exploreHeading}>
          <Heading value="People" />
        </div>
        <PeopleLists peoplelist={peopleLists} />
        <div className={classes.exploreHeading}>
          <Heading value="Teams" />
        </div>
        <MyTeamLists page="landing" team={teamLists} />
        <div className={classes.exploreHeading}>
          <Heading value="Events" />
        </div>
        <EventLists events={mockEventLists} />
      </div>
    </>
  );

  const variants = {
    hidden: { y: 850 },
    visible: {
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      y: 850,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <motion.div
      variants={variants}
      key="explorePage"
      initial="hidden"
      animate="visible"
      exit="exit"
      className={classes.page}
    >
      {/* <Background> */}
      {/* Background has display: flex so this div is for that */}

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

      {/* </Background> */}
    </motion.div>
  );
};

export default ExplorePage;
