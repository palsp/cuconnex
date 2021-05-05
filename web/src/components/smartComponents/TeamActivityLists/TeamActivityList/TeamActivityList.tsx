import React, { useState, useEffect } from "react";
import classes from "./TeamActivityList.module.css";
import { Logo, ActivityPic } from "@dumbComponents/UI";
import { IEventData, IFetchTeam, ITeamEventData } from "@src/models";
import { fetchEventsDataAPI } from "@api/index";

interface Props {
  event: ITeamEventData;
  team: IFetchTeam;
}

const TeamActivityList: React.FC<Props> = (props) => {
  let imageURL = "";
  const [eventLists, setEventLists] = useState<IEventData[] | []>([]);
  useEffect(() => {
    fetchEventsHandler();
  }, []);
  const fetchEventsHandler = async () => {
    const eventsData = await fetchEventsDataAPI();
    console.log("SUCCESS fetchDataHandler", eventsData.data.events);
    setEventLists(eventsData.data.events);
  };
  eventLists.forEach((event) => {
    if (event.id === props.event.id) {
      // console.log(`${props.event.eventName} come with ${event.id}`);
      imageURL = event.image;
    }
  });
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
          <ActivityPic PicUrl={imageURL} />
          {/* <Logo /> */}
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
