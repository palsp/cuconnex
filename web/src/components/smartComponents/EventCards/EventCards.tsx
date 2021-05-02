import React from "react";
import classes from "./EventCards.module.css";
import EventCard from "./EventCard/EventCard";
import { IEventData } from "@src/models";

interface Props{
  events:IEventData
}
const EventCards: React.FC<Props> = (props) => {
  return (
    <div className={classes.mainDiv}>
      <EventCard events={props.events} />
    </div>
  );
};

export default EventCards;
