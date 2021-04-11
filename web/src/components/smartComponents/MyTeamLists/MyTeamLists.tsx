import React from "react";
import MyTeamList from "@smartComponents/MyTeamLists/MyTeamList/MyTeamList";
import classes from "./MyTeamLists.module.css";

interface Props {
  page?: string;
}

const teamArray = [
  { name: "Suki Tee Noi", event: "CUCONNEX Project", status: "Recruiting" },
  { name: "Nature", event: "Park Sa Mart", status: "Awaiting" },
  { name: "BMP", event: "Smart Toilet", status: "" },
];

const MyTeamLists: React.FC<Props> = (props) => {
  let landing = false;
  if (props.page === "landing") {
    landing = true;
  }
  return (
    <div className={classes.container} data-test="myTeamLists">
      {teamArray.map((team, index) => {
        return <MyTeamList key={index} team={team} landing={landing} />;
      })}
    </div>
  );
};

export default MyTeamLists;
