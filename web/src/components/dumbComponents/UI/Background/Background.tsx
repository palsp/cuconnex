import React from "react";
import classes from "./Background.module.css";

const Background: React.FC = ({children}) => {
  return <div className={classes.appBackground}>
    {children}
  </div>;
};

export default Background;
