import React from "react";
import classes from "./Check.module.css";

const Check: React.FC = () => {
  return (
    <div className={classes.check}>
      <div className={classes.checksolid}></div>
    </div>
  );
};

export default Check;