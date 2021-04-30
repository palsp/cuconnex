import classes from "./LandingHero.module.css";
import React, { useContext, useEffect, useState } from "react";
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
import { useNavigation } from "framer";
import { ITeam, IUser } from "@models/index";
import { callTeamOfUserAPI } from "@src/api";
import { UserContext } from "@context/UserContext";

interface Props {
  hasTeam: boolean;
  userData: IUser;
}

const LandingHero: React.FC<Props> = (props) => {
  const [currentTeamLists, setCurrentTeamLists] = useState<ITeam[]>([]);
  const { userData } = useContext(UserContext);

  let marginHeight;
  if (window.innerHeight > 800) {
    marginHeight = -(window.innerHeight * 0.8);
  } else {
    marginHeight = -(window.innerHeight * 0.9);
  }

  useEffect(() => {
    fetchTeamHandler();
  }, []);
  const fetchTeamHandler = async () => {
    const teamData = await callTeamOfUserAPI(userData.id);
    console.log("fetchTeamHandler", teamData);
    setCurrentTeamLists(teamData.data.teams);
  };

  const heroPrompt = props.hasTeam ? (
    <div className={classes.myteamDiv}>
      <MyTeamLists page="landing" team={currentTeamLists} />
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
      <motion.div
        animate={{ rotate: 180 }}
        transition={{ ease: "linear", duration: 4, repeat: Infinity }}
        style={{ bottom: marginHeight }}
        className={classes.circle_overlay}
        data-test="landing-hero-halfcircleoverlay"
      ></motion.div>
    </div>
  );

  return (
    <div className={classes.mainDiv}>
      <div className={classes.upperpartDiv}>
        <div className={classes.profileDiv}>
          <Link to={{ pathname: "/profile", state: { users: props.userData } }}>
            <ProfilePic size="smallMedium" PicUrl={props.userData.image} />
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
