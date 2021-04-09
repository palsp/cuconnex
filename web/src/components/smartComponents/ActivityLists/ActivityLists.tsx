import React from "react";
import ActivityList from "@smartComponents/ActivityLists/ActivityList/ActivityList";
import classes from "./ActivityLists.module.css";

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

const ActivityLists: React.FC = () => {
  return (
    <div data-test="education-lists">
      <div className={classes.heading}>Current Activities</div>
      {activityArray.map((activity, index) => {
        return <ActivityList key={index} activityBox={activity} />;
      })}
    </div>
  );
};

export default ActivityLists;
