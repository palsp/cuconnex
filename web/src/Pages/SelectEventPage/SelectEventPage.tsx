import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./SelectEventPage.module.css";
import { Heading } from "@dumbComponents/UI";
import { ArrowLeft, WebBuilder } from "@dumbComponents/UI/Icons";
import EventLists from "@smartComponents/EventLists/EventLists";
import Tag from "@dumbComponents/UI/Tag/Tag";
import { fetchEventsDataAPI, fetchUserDataAPI } from "@api/index";
import { IEventData } from "@src/models";
import { motion } from "framer-motion";
import containerVariants from "@src/models/models";
//import mock types
import mockEventTypes from "./mockEventType";

const SelectEventPage: React.FC = () => {
  const [eventLists, setEventLists] = useState<IEventData[] | []>([]);

  const [showMockEventTypeModal, setShowMockEventTypeModal] = useState<boolean>(
    true
  );
  const mockEventModalClickHandler = (state: boolean) => {
    setShowMockEventTypeModal(state);
  };

  useEffect(() => {
    fetchEventsHandler();
  }, []);
  const fetchEventsHandler = async () => {
    const eventsData = await fetchEventsDataAPI();
    console.log("SUCCESS fetchDataHandler", eventsData.data.events);
    setEventLists(eventsData.data.events);
  };

  const defaultPage = (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className={classes.divHeading}>
        <div className={classes.divFixed}>
          <div className={classes.relativeArrow}>
            {/* <Link to="/landing">
              <ArrowLeft />
            </Link> */}
            <div onClick={() => mockEventModalClickHandler(true)}>
              <ArrowLeft />
            </div>
          </div>
          <Heading
            data-test="friends-page-header"
            value="Technology"
            size="small"
          />
          <Tag />
        </div>
      </div>

      <div className={classes.eventDiv}>
        <EventLists events={eventLists}></EventLists>
      </div>
    </motion.div>
  );
  const mockEventTypeModal = (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className={classes.divHeading}>
        <div className={classes.relativeArrow}>
          <Link to="/landing">
            <ArrowLeft />
          </Link>
        </div>
        <Heading
          data-test="friends-page-header"
          value="Choose event type"
          size="smallMedium"
        />
        <Tag />
      </div>

      <div className={classes.eventTypeListContainer}>
        <div className={classes.eventTypeList}>
          {mockEventTypes.map((eventName, key) => (
            <div key={key} className={classes.eventTypeCardContainer}>
              <div
                className={classes.eventTypeCard}
                onClick={() => mockEventModalClickHandler(false)}
              >
                <div className={classes.cardContent}>
                  {eventName}
                  <div className={classes.icon}>
                    <WebBuilder />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
  const pageDisplay = showMockEventTypeModal ? mockEventTypeModal : defaultPage;
  return pageDisplay;
};

export default SelectEventPage;
