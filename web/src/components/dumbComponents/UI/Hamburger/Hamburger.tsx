import React from "react";
import classes from "./Hamburger.module.css";
const Hamburger: React.FC = () => {
  return (
    <svg className={classes.hamburger} viewBox="0 0 80 80">
      <rect width="80" height="10"></rect>
      <rect y="30" width="80" height="10"></rect>
      <rect y="60" width="80" height="10"></rect>
    </svg>
  );
};

export default Hamburger;
