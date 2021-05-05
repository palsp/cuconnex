import React from "react";
import classes from "./CircleFilledGrey.module.css";

// interface Props {
//   chevron: any;
// }

const CircleFilledGrey: React.FC = () => {
  return (
    <div>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="circle"
        // className="svg-inline--fa fa-circle fa-w-16"
        className={classes.FilledGrey}
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="31"
        height="30"
      >
        <path
          fill="currentColor"
          d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
        ></path>
      </svg>
    </div>
  );
};

export default CircleFilledGrey;
