import React from "react";
import classes from "./EventCard.module.css";
interface Props {
  event?: {
    name: string;
    description: string;
    status: string;
  };
}

const EventCard: React.FC<Props> = (props) => {
  let cssArrayEvent = null;
  switch (props.event?.status) {
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
  console.log(props)
  return (
    <div className={classes.mainDiv}>
      <div className={classes.textbodyDiv}>
        <div className={classes.eventnameDiv}>{props.event?.name}</div>
        <div className={classes.eventdescriptionDiv}>
          {props.event?.description}
        </div>
        <div className={cssArrayEvent.join(" ")}>{props.event?.status}</div>
        <div className={classes.eventPic}></div>
      </div>
    </div>
  );
};

export default EventCard;
