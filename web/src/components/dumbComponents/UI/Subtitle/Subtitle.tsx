import React from "react";
import classes from "./Subtitle.module.css";

interface Props {
  value: string;
  color?: string;
  size?: string;
}
const Subtitle: React.FC<Props> = (props) => {
  let cssArray = null;
  switch (props.color) {
    case "pink":
      cssArray = [classes.subtitle];
      break;
    case "black":
      cssArray = [classes.subtitlePageBlack];
      break;
    default:
      cssArray = [classes.subtitle];
      break;
  }
  switch (props.size) {
    case "small":
      cssArray.push(classes.smallSize);
      break;
    case "medium":
      cssArray.push(classes.mediumSize);

      break;
    case "big":
      cssArray.push(classes.bigSize);

      break;
  }
  return (
    <div data-test="subtitle">
      <p data-test="subtitle-prop-value" className={cssArray.join(" ")}>
        {props.value}
      </p>
    </div>
  );
};

export default Subtitle;
