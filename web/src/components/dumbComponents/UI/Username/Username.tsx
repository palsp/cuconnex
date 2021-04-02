import React from "react";
import classes from "./Username.module.css";

interface Props {
  value: string;
}

const Username: React.FC<Props> = (props) => {
  return (
    <div data-test="usernameComponent">
      <p className={classes.pTag} data-test="username-prop-value">
        {props.value}
      </p>
    </div>
  );
};

export default Username;
