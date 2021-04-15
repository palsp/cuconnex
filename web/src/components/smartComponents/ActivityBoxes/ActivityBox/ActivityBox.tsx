import React from "react";
import TextWithSubHeading from "@dumbComponents/UI/TextWithSubHeading/TextWithSubHeading";
import classes from "./ActivityBox.module.css";

interface Props {
  activityBox: {
    activityName: string;
    activityPic: any;
    activitySubHeading1: string;
    activitySubHeading2: string;
  };
}

const ActivityBox: React.FC<Props> = (props) => {
  return (
    <div data-test="activity-list" className={classes.flexboxItem}>
      <TextWithSubHeading
        data-test="activity-list-props-value"
        activityBox={props.activityBox}
      />
    </div>
  );
};

export default ActivityBox;
