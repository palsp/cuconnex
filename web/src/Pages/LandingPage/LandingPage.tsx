import React, { useState, useContext, useEffect } from "react";
import Background from "../../components/dumbComponents/UI/Background/Background";
import HamburgerPrompt from "./HamburgerPrompt/HamburgerPrompt";
import classes from "./LandingPage.module.css";
import LandingHero from "./Sections/LandingHero";
import { IFetchTeam } from "@src/models/models";
import { motion } from "framer-motion";
import { UserContext } from "@context/UserContext";
import { ErrorContext } from "@context/ErrorContext";
import { callTeamOfUserAPI } from "@src/api";
import NavBar from "@smartComponents/NavBar/NavBar";
import { AnimatePresence } from "framer-motion";
import TeamList from "@smartComponents/MyTeamLists/MyTeamList/MyTeamList";

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
  const { setErrorHandler } = useContext(ErrorContext);
  const [myTeamLists, setMyTeamLists] = useState<IFetchTeam[] | []>([]);
  const { userData } = useContext(UserContext);
  const [menuHeightStyle, setMenuHeightStyle] = useState({ height: "" });
  const [dataFetched, setDataFetched] = useState<boolean>(false);

  const motionKey = displayHamburgerMenu ? "hamburger" : "landing";

  useEffect(() => {
    fetchTeamHandler();
    setMenuHeightStyle({ height: `${window.innerHeight - 80}px` });
  }, []);

  const fetchTeamHandler = async () => {
    const teamData = await callTeamOfUserAPI(userData.id);
    console.log("fetchTeamHandler", teamData.data);
    setMyTeamLists(teamData.data.teams);
    console.log(teamData.data.teams);
    setDataFetched(true);
  };

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
    <Background hasNav={true}>
      <div
        className={
          TeamList.length > 0 ? classes.heroDivHasTeam : classes.heroDiv
        }
      >
        <LandingHero pageHeight={menuHeightStyle} myTeamList={myTeamLists} />
      </div>
    </Background>
  );

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
        <div>loading</div>
      )}
    </motion.div>
  );
};

export default LandingPage;
