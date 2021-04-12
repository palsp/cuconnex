import React from "react";
import TeamActivityList from "@smartComponents/TeamActivityLists/TeamActivityList/TeamActivityList";
import classes from "./TeamActivityLists.module.css";

const teamActivityArray = [
  {
    teamActivityPic: "",
    name: "CUCONNEX Project",
    event: "ICE Capstone",
    status: "Recruiting",
  },
];

const TeamActivityLists: React.FC = () => {
  return (
    <div data-test="team-activity-lists">
      <div className={classes.heading}>Ongoing Projects</div>
      {teamActivityArray.map((teamActivity, index) => {
        return <TeamActivityList key={index} teamActivityBox={teamActivity} />;
      })}
    </div>
  );
};

export default TeamActivityLists;
