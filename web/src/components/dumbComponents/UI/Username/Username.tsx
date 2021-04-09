import React from "react";
import classes from "./Username.module.css";

interface Props {
  value: string;
  color?: string;
}

const Username: React.FC<Props> = (props) => {
  let cssArray = null;
  switch (props.color) {
    case "pink":
      cssArray = [classes.usernamePink];
      break;
    default:
      cssArray = [classes.pTag];
      break;
  }
  return (
    <div data-test="usernameComponent">
      <p className={classes.pTag} data-test="username-prop-value">
        {props.value}
      </p>
    </div>
  );
};

export default Username;
