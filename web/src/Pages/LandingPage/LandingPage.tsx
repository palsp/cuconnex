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
import { UserContext } from "@context/UserContext";

const LandingPage: React.FC = () => {
  const [clickHamburger, setClickHamburger] = useState<boolean>(false);
  const [hasTeam, setHasTeam] = useState<boolean>(true);
  const { userData } = useContext(UserContext);
  const hamburgerClickedHandler = () => {
    setClickHamburger(!clickHamburger);
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
        <div
          onClick={() => setHasTeam((prev) => !prev)}
          className={classes.mailDiv}
        >
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

  return (
    <div className={classes.main}>
      <Background>
        <div>{LandingPrompt}</div>
      </Background>
    </div>
  );
};

export default LandingPage;
