import React from "react";
import Cross from "@assets/close.svg";
import classes from "./Close.module.css";

const Close: React.FC = () => {
  return (
    <>
      <img className={classes.Close} src={Cross} alt="Add Member Icon" />
    </>
  );
};

export default Close;
