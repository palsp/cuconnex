import React from "react";
import classes from "./Background.module.css";

const Background: React.FC = ({ children }) => {
  return (
    <div
      className={classes.appBackground}
      style={{ minHeight: `${window.innerHeight - 80}px` }}
    >
      {children}
    </div>
  );
};

export default Background;
