import classes from "./LandingHero.module.css";
import React, { useContext } from "react";
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
import { AnimatePresence, motion } from "framer-motion";
import { useNavigation } from "framer";
import { IFetchTeam, IUser } from "@models/index";
import { callTeamOfUserAPI } from "@src/api";
import { UserContext } from "@context/UserContext";
import WaveCanvasBg from "@src/canvas/WaveCanvasBg";

interface Props {
  myTeamList: IFetchTeam[] | [];
  pageHeight: {
    height: string;
  };
}

const LandingHero: React.FC<Props> = (props) => {
  const { userData } = useContext(UserContext);

  let marginHeight;
  if (window.innerHeight > 800) {
    marginHeight = -(window.innerHeight * 0.8);
  } else {
    marginHeight = -(window.innerHeight * 0.9);
  }

  const heroPrompt =
    props.myTeamList.length > 0 ? (
      <div className={classes.myteamDiv}>
        <MyTeamLists page="landing" team={props.myTeamList} />
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
        {/* <motion.div
          animate={{ rotate: 180 }}
          transition={{ ease: "linear", duration: 4, repeat: Infinity }}
          style={{ bottom: marginHeight, position: "absolute" }}
          className={classes.circle_overlay}
          data-test="landing-hero-halfcircleoverlay"
        ></motion.div> */}
      </div>
    );

  return (
    <div className={classes.mainDiv}>
      <div className={classes.upperpartDiv}>
        <div className={classes.profileDiv}>
          <Link to={{ pathname: "/profile", state: { users: userData } }}>
            <ProfilePic size="s" PicUrl={userData.image} />
          </Link>
        </div>
        <div className={classes.subupperpartDiv}>
          <div className={classes.subtitleDiv}>
            <div className={classes.welcome}>Welcome,</div>
            <div className={classes.headingDiv}>
              <Username value={userData.name} />
            </div>
          </div>
        </div>
      </div>

      {heroPrompt}
    </div>
  );
};

export default LandingHero;
