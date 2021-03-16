import React from "react";

import CUConnexLogo from "@assets/Logo/cuconnexLogo.png";

import classes from "./AppLogo.module.css";

const AppLogo: React.FC = () => {
  return (
    <div>
      <img
        className={classes.appLogo}
        data-test="app-logo"
        src={CUConnexLogo}
        alt="CU CONNEX LOGO"
      />
    </div>
  );
};

export default AppLogo;
