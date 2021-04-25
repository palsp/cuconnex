import React, { useState, useContext } from "react";
import { ProfilePic } from "@smartComponents/index";
import Hamburger from "@dumbComponents/UI/Hamburger/Hamburger";
import { ArrowLeft, ArrowRight, Search } from "@dumbComponents/UI/Icons";
import Mail from "@dumbComponents/UI/Icons/Mail/Mail";
import { Link } from "react-router-dom";
import Background from "../../components/dumbComponents/UI/Background/Background";
import HamburgerPrompt from "./HamburgerPrompt/HamburgerPrompt";
import classes from "./LandingPage.module.css";
import LandingHero from "./Sections/LandingHero";
import containerVariants from "@src/models/models";
import { motion } from "framer-motion";
import { UserContext } from "@context/UserContext";

const LandingPage: React.FC = () => {
  const [clickHamburger, setClickHamburger] = useState<boolean>(false);
  const [hasTeam, setHasTeam] = useState<boolean>(true);
  const { userData } = useContext(UserContext);
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
        <Link to="/notification">
        <div
          //onClick={() => setHasTeam((prev) => !prev)}
          className={classes.mailDiv}
        >
          <Mail />
        </div>
        </Link>
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={classes.main}
    >
      <Background>
        <div>{LandingPrompt}</div>
      </Background>
    </motion.div>
  );
};

export default LandingPage;
