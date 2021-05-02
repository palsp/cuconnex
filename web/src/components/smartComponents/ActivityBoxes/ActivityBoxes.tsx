import React from "react";
import ActivityBox from "@smartComponents/ActivityBoxes/ActivityBox/ActivityBox";
import classes from "./ActivityBoxes.module.css";
import mockActivityBoxes from "@src/mockData/mockActivitiesBoxes";
import { ActivityBoxesData } from "@src/mockData/Models";
interface Props{
  activitybox:ActivityBoxesData[] | []
}
const ActivityBoxes: React.FC<Props> = (props) => {
  return (
    <div data-test="activity-lists" className={classes.container}>
      {props.activitybox.map((activity:ActivityBoxesData, index:number) => {
        return <ActivityBox key={index} activityBox={activity} />;
      })}
    </div>
  );
};

export default ActivityBoxes;
