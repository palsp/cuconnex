import React from "react";
import classes from "./TextWithSubHeading.module.css";

interface Props {
  activityBox: {
    activityName: string;
    activitySubHeading1?: string;
    activitySubHeading2?: string;
  };
}
const TextWithSubHeading: React.FC<Props> = (props) => {
  return (
    <div className={classes.box}>
      <div className={classes.heading}>{props.activityBox.activityName}</div>
      <div className={classes.subheading}>
        {props.activityBox.activitySubHeading1}
        <br></br>
        {props.activityBox.activitySubHeading2}
      </div>
    </div>
  );
};

export default TextWithSubHeading;
