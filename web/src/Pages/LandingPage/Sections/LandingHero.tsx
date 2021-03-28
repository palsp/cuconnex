import classes from "./LandingHero.module.css";
import React from "react";
import "react-toggle/style.css";
import FindteamLogo from "../../../components/dumbComponents/UI/FindteamLogo/FindteamLogo";
import RecruitMemberLogo from "../../../components/dumbComponents/UI/RecruitmemberLogo/RecruitmemberLogo";
import Subtitle from "../../../components/dumbComponents/UI/Subtitle/Subtitle";
import Heading from "../../../components/dumbComponents/UI/Heading/Heading";

const LandingHero: React.FC = () => {
  return (
    <div className={classes.mainDiv}>
        <div className={classes.subtitleDiv}><Subtitle value="Now you interact as  "></Subtitle></div>
      <div className={classes.headingDiv}><Heading  value="Suki Tee Noi"></Heading>    </div>
      <div className={classes.buttonmainDiv}>
        <div className={classes.findteamDiv}>
          <FindteamLogo />
        </div>
        <div className={classes.recruitmemberDiv}>
          <RecruitMemberLogo />
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
