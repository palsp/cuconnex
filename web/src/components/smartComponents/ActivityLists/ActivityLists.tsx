import React from "react";
import ActivityList from "@smartComponents/ActivityLists/ActivityList/ActivityList";
import classes from "./ActivityLists.module.css";
import { ActivityListsData } from "@src/mockData/Models";

interface Props {
  activity: ActivityListsData[] | [];
}

const ActivityLists: React.FC<Props> = (props) => {
  return (
    <div>
      <div className={classes.heading}>Current Activities</div>
      {props.activity.map((activity: ActivityListsData, index: number) => {
        return <ActivityList key={index} activityBox={activity} />;
      })}
    </div>
  );
};

export default ActivityLists;
