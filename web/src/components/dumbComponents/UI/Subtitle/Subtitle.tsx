import React from "react";
import classes from "./Subtitle.module.css";

interface Props {
  value: string;
  color?: string;
  size?: string;
  bold?: boolean;
}
const Subtitle: React.FC<Props> = (props) => {
  const cssArray = [];
  switch (props.color) {
    case "pink":
      cssArray.push(classes.subtitlePagePink);
      break;
    case "black":
      cssArray.push(classes.subtitlePageBlack);
      break;
    default:
      cssArray.push(classes.subtitle);
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
    case "small-medium":
      cssArray.push(classes.smallMediumSize);
      break;
    case "smaller":
      cssArray.push(classes.smallerSize);
      break;
  }
  if (props.bold) {
    cssArray.push(classes.bold);
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
