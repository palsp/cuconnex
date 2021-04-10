import classes from "./LandingHero.module.css";
import React from "react";
import "react-toggle/style.css";
import {
  FindteamLogo,
  RecruitMemberLogo,
  Username,
} from "@dumbComponents/UI/index";
import { ProfilePic } from "@smartComponents/index";
import { Link } from "react-router-dom";

const LandingHero: React.FC = () => {
  return (
    <div className={classes.mainDiv}>
      <div className={classes.upperpartDiv}>
        <div className={classes.profileDiv}>
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
          <Link style={{ textDecoration: "none" }} to="/selectevents">
            <FindteamLogo />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
