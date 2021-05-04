import React from "react";
import classes from "./TeamActivityList.module.css";
import { Logo, RecruitSign } from "@dumbComponents/UI";
import { IEventData, IFetchTeam, ITeamEventData } from "@src/models";

interface Props {
  event: ITeamEventData;
  team: IFetchTeam;
}

const TeamActivityList: React.FC<Props> = (props) => {
  let cssArrayEvent = null;

  switch (props.event?.status) {
    case "Open for application":
      cssArrayEvent = [classes.eventstatusDiv];
      break;
    case "Ongoing":
      cssArrayEvent = [classes.eventstatusDiv];
      break;
    case "Upcoming":
      cssArrayEvent = [classes.upcomingDiv];
      break;
    case "Closed":
      cssArrayEvent = [classes.closedDiv];
      break;
    default:
      cssArrayEvent = [classes.nullDiv];
      break;
  }
  return (
    <div data-test="TeamActivity-list" className={classes.teamActivityList}>
      <div className={classes.teamActivityContainer}>
        <div className={classes.teamActivityLogo}>
          <Logo />
        </div>
        <div className={classes.teamActivityInfo}>
          <div className={classes.name}>{props.event.eventName}</div>
          <div className={classes.role}>{props.team.description}</div>
          <div className={cssArrayEvent.join(" ")}>{props.event.status}</div>
        </div>
      </div>
    </div>
  );
};

export default TeamActivityList;
