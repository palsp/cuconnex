import React from "react";
import classes from "./Heading.module.css";
interface Props {
  value: string;
  size?: string;
}

const Heading: React.FC<Props> = (props) => {
  const cssArray = [classes.titlePage];
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
    <div data-test="heading-title">
      <p data-test="heading-prop-value" className={cssArray.join(" ")}>
        {props.value}
      </p>
    </div>
  );
};

export default Heading;
