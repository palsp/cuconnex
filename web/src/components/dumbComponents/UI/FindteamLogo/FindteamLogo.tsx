import React from "react";
import findTeamLogo from "../../../../assets/Logo/findTeamLogo.png";

import classes from "./FindteamLogo.module.css";

const FindteamLogo: React.FC = () => {
  return (
    <div>
      <img
        className={classes.appLogo}
        src={findTeamLogo}
        alt="FIND TEAM LOGO"
      />
    </div>
  );
};

export default FindteamLogo;
