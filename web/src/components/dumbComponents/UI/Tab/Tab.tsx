import React, { useState } from "react";
import classes from "./Tab.module.css";

interface Props {
  value: string;
  number?: string;
  onClick?: () => void;
}

const Tab: React.FC<Props> = (props) => {
  let cssArray = null;
  if (props.number != null) {
    cssArray = [classes.Number];
  } else {
    cssArray = [classes.Button];
  }
  return (
    <button
      data-test="button"
      className={cssArray.join(" ")}
      onClick={props.onClick}
    >
      <div className={classes.tabValue}>{props.value}</div>
      <div className={classes.tabNumber}>
        <div className={classes.circle}>
          <p>{props.number}</p>
        </div>
      </div>
    </button>
  );
};

export default Tab;
