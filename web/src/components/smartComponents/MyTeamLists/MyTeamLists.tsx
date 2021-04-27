import React from "react";
import MyTeamList from "@smartComponents/MyTeamLists/MyTeamList/MyTeamList";
import classes from "./MyTeamLists.module.css";
import { MyTeamListsData } from "@src/mockData/Models";
import { ITeam } from "@src/models";

interface Props {
  page?: string;
  team: ITeam[] | [];
}

const MyTeamLists: React.FC<Props> = (props) => {
  let landingexplore = false;
  if (props.page === "landing" || props.page === "explore") {
    landingexplore = true;
  }
  return (
    <div className={classes.teamLists} data-test="myTeamLists">
      {props.team.map((team: ITeam, index: number) => {
        return <MyTeamList key={index} team={team} landingexplore={landingexplore} page={props.page} />;
      })}
    </div>
  );
};

export default MyTeamLists;
