import React from "react";
import findTeamLogo from "../../../../assets/Logo/findTeamLogo.png";

import classes from "./FindteamLogo.module.css";

const FindteamLogo: React.FC = () => {
  return (
    <div className={classes.main}>
      <img
        className={classes.appLogo}
        src={findTeamLogo}
        alt="FIND TEAM LOGO"
      />
      <div className={classes.space}>Find Team</div>
    </div>
  );
};

export default FindteamLogo;
