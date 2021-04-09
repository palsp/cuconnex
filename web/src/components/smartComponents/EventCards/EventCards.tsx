import React from "react";
import classes from "./EventCards.module.css";
import EventCard from "./EventCard/EventCard";
const sampleEvent = {
    name: "ISE Hackathon4",
    description:
      "The biggest Chula's business case competition with more than 100 million baht awards",
    status: "Upcoming",
  };
  const EventCards: React.FC = () => {
    return (
      <div className={classes.mainDiv}><EventCard event={sampleEvent}/></div>
    );
  };
  
  export default EventCards;