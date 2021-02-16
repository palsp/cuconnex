import React from "react";
import classes from "./Button.module.css";
interface Props {
  children: string;
  onClick: () => void;
}

const Button: React.FC<Props> = (props) => {
  return (
    <button
      data-test="button"
      className={classes.Button}
      onClick={props.onClick}
    >
      <p data-test="button-props-children">{props.children}</p>
    </button>
  );
};

export default Button;
