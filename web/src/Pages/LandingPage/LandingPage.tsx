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
import { valueScaleCorrection } from "framer-motion/types/render/dom/projection/scale-correction";
import { callTeamOfUserAPI } from "@src/api";

const LandingPage: React.FC = () => {
  const [clickHamburger, setClickHamburger] = useState<boolean>(false);
  const [currentTeamLists, setCurrentTeamLists] = useState<ITeam[]>([]);
  const { userData } = useContext(UserContext);
  let hasTeam=false;
  const hamburgerClickedHandler = () => {
    setClickHamburger(!clickHamburger);
  };
  useEffect(() => {
    fetchTeamHandler().then((value: ITeam[] | []) =>
      setCurrentTeamLists(value)
    );
  }, []);
  if(currentTeamLists.length!=0){
    hasTeam=false;
  }
  const fetchTeamHandler = async () => {
    const teamData = await callTeamOfUserAPI(userData.id);
    console.log("fetchTeamHandler", teamData);
    return teamData.data.teams;
  };
  console.log(hasTeam);
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
        <div
          //onClick={() => setHasTeam((prev) => !prev)}
          className={classes.mailDiv}
        >
          <Link to="/notification">
            <Mail />
          </Link>
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
