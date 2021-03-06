import React from "react";
import MyTeamList from "@smartComponents/MyTeamLists/MyTeamList/MyTeamList";
import classes from "./MyTeamLists.module.css";
import { MyTeamListsData } from "@src/mockData/Models";
import { IFetchTeam } from "@src/models";

interface Props {
  page?: string;
  team: IFetchTeam[] | [];
}

const MyTeamLists: React.FC<Props> = (props) => {
  let landingexplore = false;
  if (props.page === "landing" || props.page === "explore") {
    landingexplore = true;
  }
  return (
    <div className={classes.teamLists} data-test="myTeamLists">
      {props.team?.map((team: IFetchTeam, index: number) => {
        return (
          <MyTeamList
            key={index}
            team={team}
            landingexplore={landingexplore}
            page={props.page}
          />
        );
      })}
    </div>
  );
};

export default MyTeamLists;
