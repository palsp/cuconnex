import React, { useState } from "react";
import classes from "./Tab.module.css";

interface Props {
  value: string;
  onClick?: () => void;
}

const Tab: React.FC<Props> = (props) => {
  return (
    <button
      data-test="button"
      className={classes.Button}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default Tab;
