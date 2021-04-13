import React from "react";
import PlusP from "@assets/plus.svg";
import classes from "./Plus.module.css";

const Plus: React.FC = () => {
  return (
    <>
      <img className={classes.Plus} src={PlusP} alt="Plus" />
    </>
  );
};

export default Plus;
