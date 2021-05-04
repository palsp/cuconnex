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
import { Link, Redirect } from "react-router-dom";
import mockEventLists from "@src/mockData/mockEventLists";
import mockActivityBoxes from "@src/mockData/mockActivitiesBoxes";
import { IEventData, IUser } from "@src/models";
import { motion } from "framer-motion";
import containerVariants, { IFetchTeam } from "@src/models/models";
import { UserContext } from "@context/UserContext";
import {
  callTeamOfUserAPI,
  fetchRecommendedTeam,
  fetchRecommendedUser,
} from "@src/api";
import {
  Coding,
  Chatbot,
  FinTech,
  Startup,
  Case,
  Ecommerce,
  Ads,
  Blockchain,
  Finance,
  WebBuilder,
  Graphic,
  Fashion,
  Marketing,
  UXUI,
} from "@dumbComponents/UI/Icons";
import mockEventTypes from "@pages/SelectEventPage/mockEventType";

const ExplorePage = () => {
  const [redirect, setRedirect] = useState<JSX.Element>();
  const [hasSearch, setHasSearch] = useState<boolean>(false);
  const [noSearchResult, setNoSearchResult] = useState<boolean>(false);
  const [peopleLists, setPeopleLists] = useState<IUser[]>([]);
  const [teamLists, setTeamLists] = useState<IFetchTeam[] | []>([]);
  const [eventLists, setEventLists] = useState<IEventData[]>([]);
  const [recommendedPeopleLists, setRecommendedPeopleLists] = useState<IUser[]>(
    []
  );
  const [recommendedTeamLists, setRecommendedTeamLists] = useState<
    IFetchTeam[] | []
  >([]);
  useEffect(() => {
    fetchRecommendedUserHandler();
    fetchRecommendedTeamHandler();
  }, []);
  const fetchRecommendedUserHandler = async () => {
    try {
      const recommendedUsers = await fetchRecommendedUser();
      setRecommendedPeopleLists(recommendedUsers.data.users);
      console.log("fetchRecommendedUser", recommendedUsers);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchRecommendedTeamHandler = async () => {
    try {
      const recommendedTeams = await fetchRecommendedTeam();
      setRecommendedTeamLists(recommendedTeams.data.teams);
      console.log("fetchRecommendedTeam", recommendedTeams);
    } catch (e) {
      console.log(e);
    }
  };

  const activityPrompt = (
    <div className={classes.eventTypeListContainer}>
      <div className={classes.eventTypeList}>
        {mockEventTypes.map((eventName, key) => (
          <div
            onClick={() => {
              console.log("clickedddd", eventName);
              setRedirect(
                <Redirect
                  to={{
                    pathname: "/selectevents",
                    state: {
                      typeEvent: eventName,
                    },
                  }}
                />
              );
            }}
            key={key}
            className={classes.eventTypeCardContainer}
          >
            <div className={classes.eventTypeCard}>
              <div className={classes.cardContent}>
                {eventName}
                <div className={classes.icon}>
                  {eventName === "Technology" ? (
                    <Coding />
                  ) : eventName === "Business" ? (
                    <Case />
                  ) : eventName === "Startup" ? (
                    <Startup />
                  ) : eventName === "ECommerce" ? (
                    <Ecommerce />
                  ) : eventName === "Ads" ? (
                    <Ads />
                  ) : eventName === "Blockchain" ? (
                    <Blockchain />
                  ) : eventName === "Finance" ? (
                    <Finance />
                  ) : eventName === "Web Builder" ? (
                    <WebBuilder />
                  ) : eventName === "Chatbot" ? (
                    <Chatbot />
                  ) : eventName === "Coding" ? (
                    <Coding />
                  ) : eventName === "FinTech" ? (
                    <FinTech />
                  ) : eventName === "Graphic" ? (
                    <Graphic />
                  ) : eventName === "Fashion" ? (
                    <Fashion />
                  ) : eventName === "Marketing" ? (
                    <Marketing />
                  ) : eventName === "UX/UI" ? (
                    <UXUI />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  const explorePage = !hasSearch ? (
    <>
      <div className={classes.exploreContent}>
        <div className={classes.exploreSubtitle}>
          <Subtitle value="Suggested for you" bold />
        </div>
        <PeopleLists peoplelist={recommendedPeopleLists} />
        <MyTeamLists page="explore" team={recommendedTeamLists} />
        <div className={classes.exploreSubtitle}>
          <Subtitle value="Find from your interest..." bold />
        </div>
        {activityPrompt}
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
      <PeopleLists peoplelist={recommendedPeopleLists} />
      <MyTeamLists page="explore" team={recommendedTeamLists} />
      <div className={classes.exploreSubtitle}>
        <Subtitle value="Find from your interest..." bold />
      </div>
      {activityPrompt}
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
        <EventLists events={eventLists} />
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
      {explorePage}
      {redirect}

      {/* </Background> */}
    </motion.div>
  );
};

export default ExplorePage;
