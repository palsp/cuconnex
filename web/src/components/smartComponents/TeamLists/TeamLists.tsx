import React from "react";
import TeamList from "@smartComponents/TeamLists/TeamList/TeamList";
import classes from "./TeamLists.module.css";

const teamArray = [
  { name: "Suki Tee Noi", event: "CUCONNEX Project", status: "Recruiting" },
  { name: "Nature", event: "Park Sa Mart", status: "Recruiting" },
  { name: "BMP", event: "Smart Toilet", status: "" },
];

const TeamLists: React.FC = () => {
  return (
    <div className={classes.container} data-test="teamLists">
      {teamArray.map((team, index) => {
        return <TeamList key={index} team={team} />;
      })}
    </div>
  );
};

export default TeamLists;
