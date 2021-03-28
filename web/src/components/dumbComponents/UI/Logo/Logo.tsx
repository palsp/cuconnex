import React from "react";

import CUConnexLogo from "@assets/Logo/cuconnexLogo1.png";

import classes from "./Logo.module.css";

const Logo: React.FC = () => {
  return (
    <>
      <img
        className={classes.Logo}
        src={CUConnexLogo}
        alt="CU CONNEX LOGO"
      />
    </>
  );
};

export default Logo;