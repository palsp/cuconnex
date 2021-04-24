import classes from "./LandingHero.module.css";
import React, { useState } from "react";
import "react-toggle/style.css";
import {
  FindteamLogo,
  RecruitMemberLogo,
  Username,
} from "@dumbComponents/UI/index";
import { Link } from "react-router-dom";
import { MyTeamLists, ProfilePic } from "@smartComponents/index";
import { Plus } from "@icons/index";
import mockMyTeamListsData from "@src/mockData/mockMyTeamListsData";

import { motion, useSpring } from "framer-motion";
// import { useNavigation } from "framer";

import { IUser } from "@models/index";

interface Props {
  hasTeam: boolean;
  userData: IUser;
}

const LandingHero: React.FC<Props> = (props) => {
  const heroPrompt = props.hasTeam ? (
    <div className={classes.myteamDiv}>
      <MyTeamLists page="landing" team={mockMyTeamListsData} />
      <Link style={{ textDecoration: "none" }} to="/createteam">
        <div className={classes.addTeam}>
          <div className={classes.plus}>
            <Plus />
          </div>
          <div className={classes.text}>CREATE YOUR NEW TEAM</div>
        </div>
      </Link>
    </div>
  ) : (
    <div className={classes.buttonmainDiv}>
      <div className={classes.recruitmemberDiv}>
        <Link style={{ textDecoration: "none" }} to="/createteam">
          <RecruitMemberLogo />
        </Link>
      </div>
      <div className={classes.findteamDiv}>
        <Link style={{ textDecoration: "none" }} to="/selectevents">
          <FindteamLogo />
        </Link>
      </div>
    </div>
  );

  return (
    <div className={classes.mainDiv}>
      <div className={classes.upperpartDiv}>
        <div className={classes.profileDiv}>
          <Link to="/profile">
            <ProfilePic size="small" PicUrl={props.userData.image} />
          </Link>
        </div>
        <div className={classes.subupperpartDiv}>
          <div className={classes.subtitleDiv}>
            <div className={classes.welcome}>Welcome,</div>
            <div className={classes.headingDiv}>
              <Username value={props.userData.name} />
            </div>
          </div>
        </div>
      </div>
      {heroPrompt}
    </div>
  );
};

export default LandingHero;
