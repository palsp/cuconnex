import React, {useState, useContext} from "react";
import {ProfilePic} from "@smartComponents/index";
import Hamburger from "@dumbComponents/UI/Hamburger/Hamburger";
import {ArrowLeft, ArrowRight, Search} from "@dumbComponents/UI/Icons";
import Mail from "@dumbComponents/UI/Icons/Mail/Mail";
import {Link} from "react-router-dom";
import Background from "../../components/dumbComponents/UI/Background/Background";
import HamburgerPrompt from "./HamburgerPrompt/HamburgerPrompt";
import classes from "./LandingPage.module.css";
import LandingHero from "./Sections/LandingHero";
import {UserDataContext} from "@hooks/UserDataContext";

import {motion, AnimatePresence, AnimateSharedLayout} from "framer-motion";

const LandingPage: React.FC = () => {
  const [clickHamburger, setClickHamburger] = useState<boolean>(false);
  const [hasTeam, setHasTeam] = useState<boolean>(true);
  const {userData} = useContext(UserDataContext);
  const hamburgerClickedHandler = () => {
    setClickHamburger(!clickHamburger);
  };

  const transition = {
    // On Tap - Navigation
    type: "spring",
    delay: 0,
    stiffness: 500,
    damping: 60,
    mass: 1,
  };

  let cssArray = [classes.content];
  if (!hasTeam) cssArray = [classes.flexDiv];

  const LandingPrompt = !clickHamburger ? (
    <div className={cssArray.join(" ")}>
      <div className={classes.headerDiv}>
        {/* 
    Loong's work
    <div>
      <div className={classes.toolbarDiv}> */}

        <div className={classes.searchDiv}>
          <Link to="/explore">
            <Search />
          </Link>
        </div>
        <div onClick={() => setHasTeam((prev) => !prev)} className={classes.mailDiv}>
          <Mail />
        </div>
        <div onClick={hamburgerClickedHandler} className={classes.hamburgerDiv}>
          <Hamburger />
        </div>
      </div>
      <div className={classes.heroDiv}>
        <LandingHero userData={userData} hasTeam={hasTeam} />
      </div>
    </div>
  ) : (
    <div className={classes.promptDiv}>
      <div onClick={hamburgerClickedHandler} className={classes.arrowDiv}>
        <ArrowLeft />
      </div>
      <div className={classes.hamburgerPromptDiv}>
        <HamburgerPrompt />
      </div>
    </div>
  );

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {delay: 0.5, duration: 1},
    },
    exit: {
      x: window.innerWidth,
      transition: {delay: 1, duaration: 1},
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{opacity: 0}}
      className={classes.main}
    >
      <Background>
        <div>{LandingPrompt}</div>
      </Background>
    </motion.div>
  );
};

export default LandingPage;
