import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./SelectEventPage.module.css";
import { Heading } from "@dumbComponents/UI";
import { ArrowLeft } from "@dumbComponents/UI/Icons";
import EventLists from "@smartComponents/EventLists/EventLists";
import Tag from "@dumbComponents/UI/Tag/Tag";
import { fetchEventsDataAPI, fetchUserDataAPI } from "@api/index";
import { IEventData } from "@src/models";
import { motion } from "framer-motion";
import containerVariants from "@src/models/models";

const SelectEventPage: React.FC = () => {
  const [eventLists, setEventLists] = useState<[IEventData] | []>([]);
  useEffect(() => {
    fetchEventsHandler().then((value: [IEventData] | []) =>
      setEventLists(value)
    );
  }, []);
  const fetchEventsHandler = async () => {
    const eventsData = await fetchEventsDataAPI();
    console.log("SUCCESS fetchDataHandler", eventsData.data.events);
    return eventsData.data.events;
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className={classes.divHeading}>
        <div className={classes.divFixed}>
          <div className={classes.relativeArrow}>
            <Link to="/landing">
              <ArrowLeft />
            </Link>
          </div>
          <Heading
            data-test="friends-page-header"
            value="Technology"
            size="medium"
          />
          <Tag />
        </div>
      </div>

      <div className={classes.eventDiv}>
        <EventLists events={eventLists}></EventLists>
      </div>
    </motion.div>
  );
};

export default SelectEventPage;
