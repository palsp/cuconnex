import React from "react";
import MyTeamList from "@smartComponents/MyTeamLists/MyTeamList/MyTeamList";
import classes from "./MyTeamLists.module.css";
import { MyTeamListsData } from "@src/mockData/Models";

interface Props {
  page?: string;
  team:MyTeamListsData[] | []
}


const MyTeamLists: React.FC<Props> = (props) => {
  let landing = false;
  if (props.page === "landing") {
    landing = true;
  }
  return (
    <div className={classes.teamLists} data-test="myTeamLists">
      {props.team.map((team:MyTeamListsData, index:number) => {
        return <MyTeamList key={index} team={team} landing={landing} />;
      })}
    </div>
  );
};

export default MyTeamLists;
