import React, { useState } from "react";
import "react-toggle/style.css";
import { Hamburger, Toggles } from "@dumbComponents/UI/index";
import { Mail } from "@icons/index";
import classes from "./LandingHeader.module.css";
const LandingHeader: React.FC = () => {
  return (
    <div>
      <div className={classes.mainDiv}>
        <div className={classes.toggleDiv}>
          <Toggles></Toggles>
        </div>
        <div className={classes.subtitleDiv}>Open for recruitment</div>
        <div className={classes.mailDiv}>
          <Mail />
        </div>
        <div className={classes.hamburgerDiv}>
          <Hamburger />
        </div>
      </div>
    </div>
  );
};

export default LandingHeader;
