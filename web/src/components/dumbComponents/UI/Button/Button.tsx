import React from "react";
import classes from "./Button.module.css";
interface Props {
  value: string;
  onClick: () => void;
}

const Button: React.FC<Props> = (props) => {
  return (
    <button
      data-test="button"
      className={classes.Button}
      onClick={props.onClick}
    >
      <p data-test="button-props-value">{props.value}</p>
    </button>
  );
};

export default Button;
