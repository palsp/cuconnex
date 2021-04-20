import classes from "./LandingHero.module.css";
import React from "react";
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
import { motion } from "framer-motion";

interface Props {
  hasTeam: boolean;
}

const LandingHero: React.FC<Props> = (props) => {
  const heroPrompt = props.hasTeam ? (
    <div className={classes.myteamDiv}>
      <MyTeamLists page="landing" team={mockMyTeamListsData} />
      <div className={classes.addTeam}>
        <motion.div
          transition={{
            // On Tap - Navigation
            type: "spring",
            delay: 0,
            stiffness: 500,
            damping: 60,
            mass: 1,
          }}
          className={classes.plus}
        >
          <Plus />
        </motion.div>
        <div className={classes.text}>CREATE YOUR NEW TEAM</div>
      </div>
    </div>
  ) : (
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
  );

  return (
    <div className={classes.mainDiv}>
      <div className={classes.upperpartDiv}>
        <motion.div
          transition={{
            // On Tap - Navigation
            type: "spring",
            delay: 0,
            stiffness: 500,
            damping: 60,
            mass: 1,
          }}
          className={classes.profileDiv}
        >
          <Link to="/profile">
            <ProfilePic size="small" />
          </Link>
        </motion.div>
        {/* <div className={classes.profileDiv}>
          <Link to="/profile">
            <ProfilePic size="small" />
          </Link>
        </div> */}
        <div className={classes.subupperpartDiv}>
          <div className={classes.subtitleDiv}>
            <div className={classes.welcome}>Welcome,</div>
            <div className={classes.headingDiv}>
              <Username value="Pichayada Mizzy" />
            </div>
          </div>
        </div>
      </div>
      {heroPrompt}
    </div>
  );
};

export default LandingHero;
