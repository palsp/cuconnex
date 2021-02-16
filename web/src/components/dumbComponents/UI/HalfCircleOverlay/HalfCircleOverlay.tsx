import React from "react";
import classes from "./HalfCircleOverlay.module.css";
const HalfCircleOverlay = () => {
  return (
    <svg
      className={classes.HalfCircleOverlay}
      xmlns="http://www.w3.org/2000/svg"
      width="375"
      height="920"
    >
      <path
        d="M 460 43.125 C 690.237 43.125 876.875 229.763 876.875 460 C 876.875 690.237 690.237 876.875 460 876.875 C 229.763 876.875 43.125 690.237 43.125 460 C 43.125 229.763 229.763 43.125 460 43.125 Z"
        fill="rgb(255, 255, 255)"
        opacity="0.85"
      ></path>
    </svg>
  );
};

export default HalfCircleOverlay;
