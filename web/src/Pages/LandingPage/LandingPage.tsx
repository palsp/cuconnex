import React, { useState, useContext, useEffect } from "react";
import { ProfilePic } from "@smartComponents/index";
import Hamburger from "@dumbComponents/UI/Hamburger/Hamburger";
import { ArrowLeft, ArrowRight, Search } from "@dumbComponents/UI/Icons";
import Mail from "@dumbComponents/UI/Icons/Mail/Mail";
import { Link } from "react-router-dom";
import Background from "../../components/dumbComponents/UI/Background/Background";
import HamburgerPrompt from "./HamburgerPrompt/HamburgerPrompt";
import classes from "./LandingPage.module.css";
import LandingHero from "./Sections/LandingHero";
import containerVariants, { ITeam } from "@src/models/models";
import { motion } from "framer-motion";
import { UserContext } from "@context/UserContext";
import { ErrorContext } from "@context/ErrorContext";
import { callTeamOfUserAPI, teamInvitationAPI } from "@src/api";
import { Button } from "@material-ui/core";
import NavBar from "@smartComponents/NavBar/NavBar";
import { AnimatePresence } from "framer-motion";

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
  const [currentTeamLists, setCurrentTeamLists] = useState<ITeam[]>([]);
  const { setErrorHandler } = useContext(ErrorContext);
  const [myTeamLists, setMyTeamLists] = useState<ITeam[] | []>([]);
  const { userData } = useContext(UserContext);
  const [heightStyle, setHeightStyle] = useState({});

  useEffect(() => {
    fetchTeamHandler();
    setHeightStyle({ height: `${window.innerHeight - 80}px` });
  }, []);

  const fetchTeamHandler = async () => {
    const teamData = await callTeamOfUserAPI(userData.id);
    console.log("fetchTeamHandler", teamData.data);
    setMyTeamLists(teamData.data.teams);
  };
  const hamburgerClickedHandler = () => {
    setDisplayHamburgerMenu((prev) => !prev);
  };
  let hasTeam = false;
  if (myTeamLists.length > 0) {
    hasTeam = true;
  }
  console.log(hasTeam);
  let cssArray = [classes.content];
  if (!hasTeam) cssArray = [classes.flexDiv];

  let marginHeight;
  if (window.innerHeight > 800) {
    marginHeight = window.innerHeight * 0.25;
  } else {
    marginHeight = window.innerHeight * 0.15;
  }

  const landingVariants = {
    hidden: { x: -400 },
    visible: {
      x: 0,
      transition: {
        duration: 0.4,
      },
    },
    exit: { x: -400 },
  };

  const hamburgerMenuVariants = {
    hidden: { x: 400 },
    visible: {
      x: 0,
      transition: {
        duration: 0.4,
      },
    },
    exit: { x: 400 },
  };

  const LandingPrompt = displayHamburgerMenu ? (
    <AnimatePresence>
      <motion.div
        variants={hamburgerMenuVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={classes.hamburgerPrompt} style={heightStyle}>
          <HamburgerPrompt />
        </div>
      </motion.div>
    </AnimatePresence>
  ) : (
    <motion.div
      variants={landingVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={classes.main}
    >
      <Background>
        <div className={cssArray.join(" ")}>
          <div className={classes.heroDiv}>
            <LandingHero userData={userData} hasTeam={hasTeam} />
          </div>
        </div>
      </Background>
    </motion.div>
  );

  return (
    <motion.div
      exit={{
        opacity: 0,
        transition: {
          duration: 0.2,
        },
      }}
    >
      <div className={classes.main}>
        <NavBar
          displayHamburgerMenu={displayHamburgerMenu}
          setDisplayHamburgerMenu={setDisplayHamburgerMenu}
        />
        {LandingPrompt}
      </div>
    </motion.div>
  );
};

export default LandingPage;
