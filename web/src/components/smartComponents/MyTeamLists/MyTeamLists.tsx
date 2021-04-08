import React from "react";
import MyTeamList from "@smartComponents/MyTeamLists/TeamList/TeamList";
import classes from "./MyTeamLists.module.css";

const teamArray = [
  { name: "Suki Tee Noi", event: "CUCONNEX Project", status: "Recruiting" },
  { name: "Nature", event: "Park Sa Mart", status: "Recruiting" },
  { name: "BMP", event: "Smart Toilet", status: "" },
];

const MyTeamLists: React.FC = () => {
  return (
    <div className={classes.container} data-test="teamLists">
      {teamArray.map((team, index) => {
        return <MyTeamList key={index} team={team} />;
      })}
    </div>
  );
};

export default MyTeamLists;
