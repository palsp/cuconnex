import React from "react";
import classes from "./Button.module.css";
interface Props {
  children: string;
}

const Button: React.FC<Props> = (props) => {
  return (
    <button data-test="button" className={classes.Button}>
      <p data-test="button-props-children">{props.children}</p>
    </button>
  );
};

export default Button;
