import React from "react";
import ActivityList from "@smartComponents/ActivityLists/ActivityList/ActivityList";
import classes from "./ActivityLists.module.css";
import { ActivityListsData } from "@src/mockData/Models";

const activityArray = [
  {
    activityPic: "",
    name: "Sasin Business Case",
    role: "Developer",
    status: "Team owner",
  },
  {
    activityPic: "",
    name: "CUCONNEX",
    role: "Project Manager",
    status: "Team owner",
  },
];
interface Props {
  activity:ActivityListsData[] | []
}

const ActivityLists: React.FC<Props> = (props) => {
  return (
    <div data-test="education-lists">
      <div className={classes.heading}>Current Activities</div>
      {props.activity.map((activity:ActivityListsData, index:number) => {
        return <ActivityList key={index} activityBox={activity} />;
      })}
    </div>
  );
};

export default ActivityLists;
