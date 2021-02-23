import React from "react";
import PicWithText from "../../../dumbComponents/UI/PicWithText/PicWithText";
import classes from "./ActivityList.module.css";

interface Props {
  activityBox: {
    activityName: string;
    activityPic: any;
  };
  // name: string;
}

const ActivityList: React.FC<Props> = (props) => {
  return (
    <div data-test="activity-list" className={classes.flexboxItem}>
      <PicWithText
        data-test="activity-list-props-value"
        value={
          props.activityBox ? props.activityBox.activityName : "test-value"
        }
      />
    </div>
  );
};

export default ActivityList;
