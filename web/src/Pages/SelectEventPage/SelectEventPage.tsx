import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./SelectEventPage.module.css";
import { Heading } from "@dumbComponents/UI";
import { ArrowLeft } from "@dumbComponents/UI/Icons";
import EventLists from "@smartComponents/EventLists/EventLists";
import Tag from "@dumbComponents/UI/Tag/Tag";
import { fetchEventsDataAPI, fetchUserDataAPI } from "@api/index";
import { IEventData } from "@src/models";
const SelectEventPage: React.FC = () => {
  const [eventLists, setEventLists] = useState<[IEventData] | []>([]);
  useEffect(() => {
    fetchEventsHandler().then( (value:[IEventData] | []) => setEventLists(value));
  }, []);
  const fetchEventsHandler = async () => {
      const eventsData = await fetchEventsDataAPI();
      console.log("SUCCESS fetchDataHandler", eventsData.data.events);
      return (eventsData.data.events);
  };
  return (
    <div className={classes.mainDiv}>
      <div className={classes.headingContainerDiv}>
        <div className={classes.arrowDiv}>
          <Link to="/landing">
            <ArrowLeft />
          </Link>
        </div>
        <div className={classes.headingDiv}>
          <Heading value="Technology"></Heading>
        </div>
      </div>
      <div>
        <Tag />
      </div>
      <div className={classes.eventDiv}>
        <EventLists events={eventLists}></EventLists>
      </div>
    </div>
  );
};

export default SelectEventPage;
