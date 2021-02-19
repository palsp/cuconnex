import React from "react";
import classes from "./InterestList.module.css";
interface Props {
  value: string;
}

const InterestList: React.FC<Props> = (props) => {
  return (
    <div data-test="interest-list" className={classes.interestList}>
      <p data-test="interest-list-props-value">{props.value}</p>
    </div>
  );
};

export default InterestList;
