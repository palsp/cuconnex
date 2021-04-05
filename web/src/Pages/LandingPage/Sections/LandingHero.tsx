import classes from "./LandingHero.module.css";
import React from "react";
import "react-toggle/style.css";
import FindteamLogo from "../../../components/dumbComponents/UI/FindteamLogo/FindteamLogo";
import RecruitMemberLogo from "../../../components/dumbComponents/UI/RecruitmemberLogo/RecruitmemberLogo";
import Subtitle from "../../../components/dumbComponents/UI/Subtitle/Subtitle";
import Heading from "../../../components/dumbComponents/UI/Heading/Heading";
import { ProfilePic, Username } from "@dumbComponents/UI";
import { Link } from "react-router-dom";

const LandingHero: React.FC = () => {
  return (
    <div className={classes.mainDiv}>
      <div className={classes.upperpartDiv}>
        <div className={classes.profileDiv}>
          <ProfilePic size="small" />
          <Link to="/profile">
            <ProfilePic size="small" />
          </Link>
        </div>
        <div className={classes.subupperpartDiv}>
          <div className={classes.subtitleDiv}>
            Welcome,
            <div className={classes.headingDiv}>
              <Username value="Pichayada mizzy" />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.buttonmainDiv}>
        <div className={classes.recruitmemberDiv}>
          <RecruitMemberLogo />
        </div>
        <div className={classes.findteamDiv}>
          <FindteamLogo />
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
