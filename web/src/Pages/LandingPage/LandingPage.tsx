import React, { useState, useContext, useEffect } from "react";
import Background from "../../components/dumbComponents/UI/Background/Background";
import HamburgerPrompt from "./HamburgerPrompt/HamburgerPrompt";
import classes from "./LandingPage.module.css";
import LandingHero from "./Sections/LandingHero";
import containerVariants, { IFetchTeam } from "@src/models/models";
import { motion } from "framer-motion";
import { UserContext } from "@context/UserContext";
import { ErrorContext } from "@context/ErrorContext";
import NavBar from "@smartComponents/NavBar/NavBar";
import { AnimatePresence } from "framer-motion";
import TeamList from "@smartComponents/MyTeamLists/MyTeamList/MyTeamList";
import {
  callTeamOfUserAPI,
  fetchFriendNotificationAPI,
  fetchFriendReceivedNotificationAPI,
  fetchTeamNotificationAPI,
  fetchUserTeamRequestAPI,
  fecthRateTeamAPI,
} from "@src/api/apiCalls";
import { IUserFriend } from "@src/models";
import WaveCanvasBg from "@src/canvas/WaveCanvasBg";

interface Props {
  location: {
    state?: {
      hamburgerOn?: boolean;
    };
  };
}

const LandingPage: React.FC<Props> = (props) => {
  const hamburgerOn = props.location.state !== undefined; // to display hamburger when transitioning from previous menu. This is a temporary fix.
  const [displayHamburgerMenu, setDisplayHamburgerMenu] = useState<boolean>(
    hamburgerOn
  );
  const [currentTeamLists, setCurrentTeamLists] = useState<IFetchTeam[]>([]);
  const { setErrorHandler } = useContext(ErrorContext);
  const [myTeamLists, setMyTeamLists] = useState<IFetchTeam[] | []>([]);
  const { userData } = useContext(UserContext);
  const [menuHeightStyle, setMenuHeightStyle] = useState({ height: "" });
  const [dataFetched, setDataFetched] = useState<boolean>(false);

  const [teamNoti, setTeamNoti] = useState<IFetchTeam[] | []>([]);
  const [outgoingTeamNoti, setOutgoingTeamNoti] = useState<IFetchTeam[] | []>(
    []
  );
  const [friendNoti, setFriendNoti] = useState<IUserFriend[] | []>([]);
  const [friendReceivedNoti, setFriendReceivedNoti] = useState<
    IUserFriend[] | []
  >([]);
  const [rateTeamNoti, setRateTeamNoti] = useState<IFetchTeam[] | []>([]);
  const motionKey = displayHamburgerMenu ? "hamburger" : "landing";

  useEffect(() => {
    fetchTeamHandler();
    setMenuHeightStyle({ height: `${window.innerHeight - 80}px` });

    fetchTeamNotiHandler().then((value: IFetchTeam[] | []) =>
      setTeamNoti(value)
    );
    fetchFriendNotiHandler().then((value: IUserFriend[] | []) =>
      setFriendNoti(value)
    );
    fetchFriendReceivedNotiHandler().then((value: IUserFriend[] | []) =>
      setFriendReceivedNoti(value)
    );
    fetchOutgoingTeamNotiHandler();
    fetchRateTeamNotiHandler().then((value: IFetchTeam[] | []) =>
      setRateTeamNoti(value)
    );
  }, []);

  const fetchTeamHandler = async () => {
    const teamData = await callTeamOfUserAPI(userData.id);
    console.log("fetchTeamHandler", teamData.data);
    setMyTeamLists(teamData.data.teams);
    console.log(teamData.data.teams);
    setDataFetched(true);
  };

  const fetchTeamNotiHandler = async () => {
    const teamNotiData = await fetchTeamNotificationAPI();
    console.log("SUCCESS fetchTeamNotiHandler", teamNotiData.data.teams);
    return teamNotiData.data.teams;
  };

  const fetchFriendNotiHandler = async () => {
    const friendsData = await fetchFriendNotificationAPI();
    return friendsData.data.requests;
  };

  const fetchOutgoingTeamNotiHandler = async () => {
    const teamNotiData = await fetchUserTeamRequestAPI();
    setOutgoingTeamNoti(teamNotiData.data.teams);
  };

  const fetchFriendReceivedNotiHandler = async () => {
    const friendsReceivedData = await fetchFriendReceivedNotificationAPI();
    return friendsReceivedData.data.requests;
  };

  const fetchRateTeamNotiHandler = async () => {
    const teamRateNotiData = await fecthRateTeamAPI();
    console.log(
      "SUCCESS fetchRateTeamNotiHandler",
      teamRateNotiData.data.teams
    );
    return teamRateNotiData.data.teams;
  };

  let badgeContent = 0;
  if (friendReceivedNoti != undefined) {
    badgeContent = badgeContent + friendReceivedNoti.length;
  }
  if (teamNoti != undefined) {
    badgeContent = badgeContent + teamNoti.length;
  }
  if (friendNoti != undefined) {
    badgeContent = badgeContent + friendNoti.length;
  }
  // if (outgoingTeamNoti != undefined) {
  //   badgeContent = badgeContent + outgoingTeamNoti.length;
  // }
  if (rateTeamNoti !== undefined) {
    badgeContent = badgeContent + rateTeamNoti.length;
  }

  const landingVariants = {
    hidden: { opacity: 0, x: -300 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, x: -300, transition: { duration: 0.2 } },
  };

  const hamburgerMenuVariants = {
    hidden: { opacity: 0, x: 300 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, x: 300, transition: { duration: 0.2 } },
  };

  const variants = displayHamburgerMenu
    ? hamburgerMenuVariants
    : landingVariants;

  const LandingPrompt = displayHamburgerMenu ? (
    <div className={classes.hamburgerPrompt} style={menuHeightStyle}>
      <HamburgerPrompt />
    </div>
  ) : (
    <div className={classes.relativeDiv}>
      <div className={classes.waveBg}>
        <WaveCanvasBg
          width={window.innerWidth}
          height={window.innerHeight * 0.7}
        />
      </div>
      <Background hasNav={true}>
        <div
          className={
            TeamList.length > 0 ? classes.heroDivHasTeam : classes.heroDiv
          }
        >
          <LandingHero pageHeight={menuHeightStyle} myTeamList={myTeamLists} />
        </div>
      </Background>
    </div>
  );
  const spinnerOne = [classes.inner];
  const spinnerTwo = [classes.inner];
  const spinnerThree = [classes.inner];

  spinnerOne.push(classes.one);
  spinnerTwo.push(classes.two);
  spinnerThree.push(classes.three);

  return (
    <motion.div
      key="landingPage"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 1, transition: { duration: 0.5 } }}
      className={classes.page}
    >
      {dataFetched ? (
        <div className={classes.landingPageContainer}>
          <NavBar
            displayHamburgerMenu={displayHamburgerMenu}
            setDisplayHamburgerMenu={setDisplayHamburgerMenu}
            badgeContent={badgeContent}
          />
          <div className={classes.animateContainer}>
            <AnimatePresence initial={false}>
              <motion.div
                key={motionKey}
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ minHeight: `${window.innerHeight - 80}px` }}
                className={classes.motion}
              >
                {LandingPrompt}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className={classes.spinnerBody}>
          <div className={classes.spinner}>
            <div className={spinnerOne.join(" ")}></div>
            <div className={spinnerTwo.join(" ")}></div>
            <div className={spinnerThree.join(" ")}></div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default LandingPage;
