import React from "react";

import CUConnexLogo from "@assets/Logo/cuconnexIcon.svg";

import classes from "./Logo.module.css";

const Logo: React.FC = () => {
  return (
    <>
      <img
        className={classes.logo}
        src={CUConnexLogo}
        alt="CU CONNEX LOGO"
      />
    </>
  );
};

export default Logo;