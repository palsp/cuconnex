import React from "react";
import classes from "./EventCard.module.css";
interface Props {
  events: {
    "event-name": string;
    bio: string;
    status?: string;
    "start-date": {
      month: number;
      day: number;
      year: number;
      time: {
        hour: number;
        minute: number;
        second: number;
      };
    };
    "end-date": {
      month: number;
      day: number;
      year: number;
      time: {
        hour: number;
        minute: number;
        second: number;
      };
    };
  };
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
        <div className={cssArrayEvent.join(" ")}>{props.events?.status}</div>
        <div className={classes.eventPic}></div>
      </div>
    </div>
  );
};

export default EventCard;
