import React from "react";
import ActivityList from "@smartComponents/ActivityLists/ActivityList/ActivityList";
import classes from "./ActivityLists.module.css";

const activityArray = [
  {
    activityName: "Technology",
    activityPic: "",
    activitySubHeading1: "BlockchainNers",
    activitySubHeading2: "DMP",
  },
  {
    activityName: "Startup",
    activityPic: "",
    activitySubHeading1: "BMP",
    activitySubHeading2: "YSEPGangs",
  },
  {
    activityName: "Design",
    activityPic: "",
    activitySubHeading1: "UXWOW",
    activitySubHeading2: "UIPeeps",
  },
  {
    activityName: "Margeting",
    activityPic: "",
    activitySubHeading1: "CaseClub12",
    activitySubHeading2: "Saosaosao",
  },
  {
    activityName: "Technology",
    activityPic: "",
    activitySubHeading1: "BlockchainNers",
    activitySubHeading2: "DMP",
  },
  {
    activityName: "Technology",
    activityPic: "",
    activitySubHeading1: "BlockchainNers",
    activitySubHeading2: "DMP",
  },
  {
    activityName: "Design",
    activityPic: "",
    activitySubHeading1: "UXWOW",
    activitySubHeading2: "UIPeeps",
  },
  {
    activityName: "Margeting",
    activityPic: "",
    activitySubHeading1: "CaseClub12",
    activitySubHeading2: "Saosaosao",
  },
];

const ActivityLists: React.FC = () => {
  return (
    <div data-test="activity-lists" className={classes.container}>
      {activityArray.map((activity, index) => {
        return <ActivityList key={index} activityBox={activity} />;
      })}
    </div>
  );
};

export default ActivityLists;
