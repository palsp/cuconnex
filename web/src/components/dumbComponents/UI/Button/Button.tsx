import React from "react";
import classes from "./Button.module.css";
interface Props {
  disabled?: boolean;
  value: string;
  type?: any;
  onClick?: () => void;
}

const Button: React.FC<Props> = (props) => {
  return (
    <div className={classes.ButtonContainer}>
    <button
      data-test="button"
      className={classes.Button}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
    >
      <p data-test="button-props-value">{props.value}</p>
    </button>
    </div>
  );
};

export default Button;
