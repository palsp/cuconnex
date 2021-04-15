import React from "react";
import classes from "./Plus.module.css";

const Plus: React.FC = () => {
  return (
    <svg
      className={classes.Plus}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
    >
      <g>
        <g>
          <polygon
            points="289.391,222.609 289.391,0 222.609,0 222.609,222.609 0,222.609 0,289.391 222.609,289.391 222.609,512 
			289.391,512 289.391,289.391 512,289.391 512,222.609"
          />
        </g>
      </g>
    </svg>
  );
};

export default Plus;
