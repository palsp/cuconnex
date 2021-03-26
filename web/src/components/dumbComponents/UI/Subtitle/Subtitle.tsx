import React from "react";
import classes from "./Subtitle.module.css";

interface Props {
  value: string;
}
const Subtitle: React.FC<Props> = (props) => {
  return (
    <div data-test="subtitle">
      <p data-test="subtitle-prop-value" className={classes.subtitle}>
        {props.value}
      </p>
    </div>
  );
};

export default Subtitle;
