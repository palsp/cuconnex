import React from "react";
import classes from "./Heading.module.css";
interface Props {
  value: string;
  color?: string;
  size?: string;
}

const Heading: React.FC<Props> = (props) => {
  let cssArray = null;
  switch (props.color) {
    case "pink":
      cssArray = [classes.titlePage];
      break;
    case "black":
      cssArray = [classes.titlePageBlack];
      break;
    default:
      cssArray = [classes.titlePage];
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
  }
  return (
    <div data-test="heading-title">
      <p data-test="heading-prop-value" className={cssArray.join(" ")}>
        {props.value}
      </p>
    </div>
  );
};

export default Heading;
