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

interface Props {
  location: {
    state?: {
      hamburgerOn?: boolean;
    };
  };
}

const LandingPage: React.FC<Props> = (props) => {
  const hamburgerOn = props.location.state !== undefined; // to display hamburger when transitioning from previous menu. This is a temporary fix.
  const [clickHamburger, setClickHamburger] = useState<boolean>(hamburgerOn);
  const [currentTeamLists, setCurrentTeamLists] = useState<ITeam[]>([]);
  const { setErrorHandler } = useContext(ErrorContext);
  const [myTeamLists, setMyTeamLists] = useState<ITeam[] | []>([]);
  const { userData } = useContext(UserContext);
  useEffect(() => {
    fetchTeamHandler();
  }, []);
  const fetchTeamHandler = async () => {
    const teamData = await callTeamOfUserAPI(userData.id);
    console.log("fetchTeamHandler", teamData);
    setMyTeamLists(teamData.data);
  };
  const hamburgerClickedHandler = () => {
    setClickHamburger(!clickHamburger);
  };
  useEffect(() => {
    fetchTeamHandler();
  }, []);
  const hasTeam = false;
  // if (myTeamLists.length > 0) {
  //   hasTeam = true;
  // }
  console.log(hasTeam);
  let cssArray = [classes.content];
  if (!hasTeam) cssArray = [classes.flexDiv];

  let marginHeight;
  if (window.innerHeight > 800) {
    marginHeight = window.innerHeight*0.25;
  } else {
    marginHeight = window.innerHeight*0.15;
  }

  const LandingPrompt = !clickHamburger ? (
    <div className={cssArray.join(" ")}>
      <div className={classes.headerDiv}>
        <div style={{ position: "absolute", top: "0px", left: "50px" }}>
          {/* <Button
            variant="contained"
            color="secondary"
            onClick={() => setHasTeam((prevState) => !prevState)}
          >
            Test Team
          </Button> */}
        </div>
        <div className={classes.searchDiv}>
          <Link to="/explore">
            <Search />
          </Link>
        </div>
        <div className={classes.mailDiv}>
          <Link to="/notification">
            <Mail />
          </Link>
        </div>
        <div onClick={hamburgerClickedHandler} className={classes.hamburgerDiv}>
          <Hamburger />
        </div>
      </div>
      <div className={classes.heroDiv} style={{ marginTop: marginHeight }}>
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
