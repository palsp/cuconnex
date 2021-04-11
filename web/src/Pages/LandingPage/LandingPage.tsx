import { ProfilePic } from "@smartComponents/index";
import Hamburger from "@dumbComponents/UI/Hamburger/Hamburger";
import { ArrowLeft, ArrowRight, Search } from "@dumbComponents/UI/Icons";
import Mail from "@dumbComponents/UI/Icons/Mail/Mail";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Background from "../../components/dumbComponents/UI/Background/Background";
import HamburgerPrompt from "./HamburgerPrompt/HamburgerPrompt";
import classes from "./LandingPage.module.css";
import LandingHero from "./Sections/LandingHero";

const LandingPage: React.FC = () => {
  const [clickHamburger, setClickHamburger] = useState(false);
  const hamburgerClickedHandler = () => {
    setClickHamburger(!clickHamburger);
  };

  const firstTime = true;
  let cssArray = [classes.content];
  if (firstTime) cssArray = [classes.flexDiv];

  const LandingPrompt = !clickHamburger ? (

    <div className={cssArray.join(" ")}>
      <div className={classes.headerDiv}>

    {/* 
    Loong's work
    <div>
      <div className={classes.toolbarDiv}> */}

        <div className={classes.searchDiv}>
          <Link to="/search">
            <Search />
          </Link>
        </div>
        <div className={classes.mailDiv}>
          <Mail />
        </div>
        <div onClick={hamburgerClickedHandler} className={classes.hamburgerDiv}>
          <Hamburger />
        </div>
      </div>
      <div className={classes.heroDiv}>
        <LandingHero firstTime={firstTime} />
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
      <div className={classes.container}>
        <div className={classes.background}>
          <Background>
            <div>{LandingPrompt}</div>
          </Background>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
