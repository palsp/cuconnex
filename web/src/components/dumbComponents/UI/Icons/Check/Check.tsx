import React from "react";
import classes from "./Check.module.css";

const Check: React.FC = () => {
  return (
    <div className={classes.check}>
      <div className={classes.circle}>
        <div className={classes.checksolid}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path
              d="M 28.28125 6.28125 L 11 23.5625 L 3.71875 16.28125 L 2.28125 17.71875 L 10.28125 25.71875 L 11 26.40625 L 11.71875 25.71875 L 29.71875 7.71875 Z"
              fill="rgb(255,255,255)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Check;
