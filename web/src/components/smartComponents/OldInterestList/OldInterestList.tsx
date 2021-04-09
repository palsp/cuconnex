import React, { useState } from "react";
import classes from "./OldInterestList.module.css";
interface Props {
  value: string;
  selectInterestHandlerDiv?: any;
}

const OldInterestList: React.FC<Props> = (props) => {
  const [clicked, setClicked] = useState(false);

  const interestClickHandler = () => {
    setClicked((prevState) => !prevState);
  };

  const imgCSS = [classes.interestImage];
  if (props.value) {
    imgCSS.push(classes[props.value.split(" ").join("")]);
  }

  if (clicked) {
    imgCSS.push(classes["isClicked"]);
  }
  return (
    <div
      onClick={() => props.selectInterestHandlerDiv(clicked)}
      data-test="interest-list"
      className={classes.interestList}
    >
      <div onClick={interestClickHandler} className={imgCSS.join(" ")}>
        <p data-test="interest-list-props-value">{props.value}</p>
      </div>
    </div>
  );
};

export default OldInterestList;
