import React from "react";
import { IEventData } from "@src/models/index";
import classes from "./EventCard.module.css";
interface Props {
  events: IEventData;
}

const EventCard: React.FC<Props> = (props) => {
  let cssArrayEvent = null;
  switch (props.events.status) {
    case "Open for application":
      cssArrayEvent = [classes.eventstatusDiv];
      break;
    case "Ongoing":
      cssArrayEvent = [classes.ongoingDiv];
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
  console.log(props);
  return (
    <div className={classes.mainDiv}>
      <div className={classes.textbodyDiv}>
        <div className={classes.eventnameDiv}>
          {props.events?.["event-name"]}
        </div>
        <div className={classes.eventdescriptionDiv}>{props.events?.bio}</div>
        <div className={classes.status}>
          <div className={cssArrayEvent.join(" ")}>{props.events?.status}</div>
          <div className={classes.date}>1 April 2021 - 30 june 2021</div>
        </div>

        <div className={classes.eventPic}></div>
      </div>
    </div>
  );
};

export default EventCard;
