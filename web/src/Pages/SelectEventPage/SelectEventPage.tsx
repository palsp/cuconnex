import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./SelectEventPage.module.css";
import { Heading } from "@dumbComponents/UI";
import { ArrowLeft } from "@dumbComponents/UI/Icons";
import EventLists from "@smartComponents/EventLists/EventLists";
import Tag from "@dumbComponents/UI/Tag/Tag";
import { fetchEventsDataAPI, fetchUserDataAPI } from "@api/index";
const SelectEventPage: React.FC = () => {
  const [fetchEvents, setFetchEvents] = useState<boolean>(false);
  const fetchEventsHandler = async () => {
    try {
      const eventsData = await fetchEventsDataAPI();
      console.log("SUCCESS fetchDataHandler", eventsData.data);
      return (eventsData.data);
    } catch (e) {
      console.log("fetchDataHandler error", e);
    }
  };
  if (!fetchEvents) {
    fetchEventsHandler();
    setFetchEvents(true);
  }
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
      </div>
    </div>
  );
};

export default SelectEventPage;
