import React from "react";
import TextWithSubHeading from "@dumbComponents/UI/TextWithSubHeading/TextWithSubHeading";
import classes from "./ActivityList.module.css";

interface Props {
  activityBox: {
    activityName: string;
    activityPic: any;
    activitySubHeading1: string;
    activitySubHeading2: string;
  };
  // name: string;
}

const ActivityList: React.FC<Props> = (props) => {
  return (
    <div data-test="activity-list" className={classes.flexboxItem}>
      <TextWithSubHeading
        data-test="activity-list-props-value"
        activityBox={props.activityBox}
        // value={
        //   props.activityBox ? props.activityBox.activityName : "test-value"
        // }
        // subHeading1={props.activityBox.activitySubHeading1}
        // subHeading2={props.activityBox.activitySubHeading2}
      />
      {/* <div className={classes.flexboxText}>
        {props.activityBox.activityName}
        <div>{props.activityBox.activityExample1}</div>
        <div>{props.activityBox.activityExample2}</div>
      </div> */}
    </div>
  );
};

export default ActivityList;
