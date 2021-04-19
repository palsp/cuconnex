import React from "react";
import TeamActivityList from "@smartComponents/TeamActivityLists/TeamActivityList/TeamActivityList";
import classes from "./TeamActivityLists.module.css";
import { TeamActivitiesData } from "@src/mockData/Models";

const teamActivityArray = [
  {
    teamActivityPic: "",
    name: "CUCONNEX Project",
    event: "ICE Capstone",
    status: "Recruiting",
  },
];
interface Props{
  activity:TeamActivitiesData[] | []
}

const TeamActivityLists: React.FC<Props> = (props) => {
  return (
    <div data-test="team-activity-lists">
      <div className={classes.heading}>Ongoing Projects</div>
      {props.activity.map((teamActivity:TeamActivitiesData, index:number) => {
        return <TeamActivityList key={index} teamActivityBox={teamActivity} />;
      })}
    </div>
  );
};

export default TeamActivityLists;
