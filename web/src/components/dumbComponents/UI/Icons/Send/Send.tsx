import React from "react";
import classes from "./Send.module.css";
const Send: React.FC = () => {
  return (
    <svg
      className={classes.send}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
    >
      <path
        d="M 22 2 L 11 13 M 22 2 L 15 22 L 11 13 L 2 9 Z"
        fill="transparent"
        stroke-width="2"
        stroke="rgb(0,0,0)"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray=""
      ></path>
    </svg>
  );
};

export default Send;
