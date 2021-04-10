import React from "react";
import ActivityBox from "@smartComponents/ActivityBoxes/ActivityBox/ActivityBox";
import classes from "./ActivityBoxes.module.css";
import mockActivityBoxes from "@src/mockData/mockActivitiesBoxes";

const ActivityBoxes: React.FC = () => {
  return (
    <div data-test="activity-lists" className={classes.container}>
      {mockActivityBoxes.map((activity, index) => {
        return <ActivityBox key={index} activityBox={activity} />;
      })}
    </div>
  );
};

export default ActivityBoxes;
