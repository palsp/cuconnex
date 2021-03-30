import { ProfilePic } from "@smartComponents/index";
import Hamburger from "@dumbComponents/UI/Hamburger/Hamburger";
import { ArrowRight } from "@dumbComponents/UI/Icons";
import Mail from "@dumbComponents/UI/Icons/Mail/Mail";
import Toggles from "@dumbComponents/UI/Toggles/Toggles";
import React, { useState } from "react";
import Background from "../../components/dumbComponents/UI/Background/Background";
import HamburgerPrompt from "./HamburgerPrompt/HamburgerPrompt";
import classes from "./LandingPage.module.css";
import LandingHeader from "./Sections/LandingHeader";
import LandingHero from "./Sections/LandingHero";

interface Props {}
const LandingPage: React.FC<Props> = () => {
  const [clickHamburger, setClickHamburger] = useState(false);
  const hamburgerClickedHandler = () => {
    setClickHamburger(!clickHamburger);
  };
  let LandingPrompt = null;
  if (!clickHamburger) {
    LandingPrompt = (
      <div className={classes.flexDiv}>
        <div className={classes.headerDiv}>
          <div className={classes.toggleDiv}>
            <ProfilePic size="small" />
          </div>
          <div className={classes.mailDiv}>
            <Mail />
          </div>
          <div
            onClick={hamburgerClickedHandler}
            className={classes.hamburgerDiv}
          >
            <Hamburger />
          </div>
        </div>
        <div className={classes.heroDiv}>
          <LandingHero />
        </div>
      </div>
    );
  } else {
    LandingPrompt = (
      <div className={classes.promptDiv}>
        <div onClick={hamburgerClickedHandler} className={classes.arrowDiv}>
          <ArrowRight />
        </div>
        <div className={classes.hamburgerPromptDiv}>
          <HamburgerPrompt />
        </div>
      </div>
    );
  }
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
