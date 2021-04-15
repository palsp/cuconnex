import React from "react";
import classes from "./EventCards.module.css";
import EventCard from "./EventCard/EventCard";

interface Props {
  event: {
    name: string;
    description: string;
    status: string;
  };
}
const EventCards: React.FC<Props> = (props) => {
  return (
    <div className={classes.mainDiv}>
      <EventCard event={props.event} />
    </div>
  );
};

export default EventCards;
