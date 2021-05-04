import React from "react";
import TeamActivityList from "@smartComponents/TeamActivityLists/TeamActivityList/TeamActivityList";
import classes from "./TeamActivityLists.module.css";
import { TeamActivitiesData } from "@src/mockData/Models";
import { IEventData, IFetchTeam, ITeamEventData } from "@src/models";

const teamActivityArray = [
  {
    teamActivityPic: "",
    name: "CUCONNEX Project",
    event: "ICE Capstone",
    status: "Recruiting",
  },
];
interface Props {
  events: ITeamEventData[];
  team: IFetchTeam;
}

const TeamActivityLists: React.FC<Props> = (props) => {
  return (
    <div data-test="team-activity-lists">
      <div className={classes.heading}>Ongoing Projects</div>
      {props.events.map((event: ITeamEventData, index: number) => {
        return <TeamActivityList key={index} team={props.team} event={event} />;
      })}
    </div>
  );
};

export default TeamActivityLists;
