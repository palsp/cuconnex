import React, { useState } from "react";
import "react-toggle/style.css";
import Hamburger from "../../../components/dumbComponents/UI/Icons/Hamburger/Hamburger";
import Mail from "../../../components/dumbComponents/UI/Icons/Mail/Mail";
import Toggles from "../../../components/dumbComponents/UI/Toggles/Toggles";
import classes from "./LandingHeader.module.css";
const LandingHeader: React.FC = () => {
  return (
      <div className={classes.mainDiv}>
      <div className={classes.toggleDiv}>
        <Toggles></Toggles>
      </div>
      <div className={classes.subtitleDiv}>
          Open for recruitment
      </div>
      <div className={classes.mailDiv}>
        <Mail />
      </div>
      <div 
      className={classes.hamburgerDiv}>
        <Hamburger
        />
      </div>
    </div>  
  );
};

export default LandingHeader;
