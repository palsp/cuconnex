import React from "react";
import classes from "./Decline.module.css";

const Decline: React.FC = () => {
  return (
    <div className={classes.Decline}>
     <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="4vh" height="4vh"  preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248s248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65l-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7l65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" fill="rgb(0,0,0)"/></svg>
    </div>
  );
};

export default Decline;