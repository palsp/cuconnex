import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./SelectEventPage.module.css";
import { Heading } from "@dumbComponents/UI";
import {
  ArrowLeft,
  Coding,
  Chatbot,
  FinTech,
  Startup,
  Case,
  Ecommerce,
  Ads,
  Blockchain,
  Finance,
} from "@dumbComponents/UI/Icons";
import EventLists from "@smartComponents/EventLists/EventLists";
import Tag from "@dumbComponents/UI/Tag/Tag";
import { fetchEventsDataAPI, fetchUserDataAPI } from "@api/index";
import { IEventData } from "@src/models";
import { motion } from "framer-motion";
import containerVariants from "@src/models/models";
//import mock types
import mockEventTypes from "./mockEventType";
import { eventNames } from "node:process";
import PageTitle from "@dumbComponents/UI/PageTitle/PageTitle";

interface Props {
  history: {
    goBack: () => void;
  };
}

const SelectEventPage: React.FC<Props> = (props) => {
  const [eventType, setEventType] = useState<string>("");
  const [eventLists, setEventLists] = useState<IEventData[] | []>([]);

  const [showMockEventTypeModal, setShowMockEventTypeModal] = useState<boolean>(
    true
  );
  const mockEventModalClickHandler = (state: boolean) => {
    setShowMockEventTypeModal(state);
  };

  const goBack = () => {
    props.history.goBack();
  };

  useEffect(() => {
    fetchEventsHandler();
  }, []);
  const fetchEventsHandler = async () => {
    const eventsData = await fetchEventsDataAPI();
    console.log("SUCCESS fetchDataHandler", eventsData.data.events);
    setEventLists(eventsData.data.events);
  };
  const setEventTypeHandler = (type: string) => {
    setEventType(type);
  };
  const defaultPage = (
    <>
      <PageTitle
        goBack={() => mockEventModalClickHandler(true)}
        size="small-medium"
        text={"Some Event"}
      />

      <div className={classes.eventDiv}>
        <EventLists events={eventLists}></EventLists>
      </div>
    </>
  );
  const mockEventTypeModal = (
    <>
      <PageTitle goBack={goBack} size="small-medium" text="Select Events" />

      <div className={classes.eventTypeListContainer}>
        <div className={classes.eventTypeList}>
          {mockEventTypes.map((eventName, key) => (
            <div key={key} className={classes.eventTypeCardContainer}>
              <div
                className={classes.eventTypeCard}
                onClick={() => {
                  setEventTypeHandler(eventName);
                  mockEventModalClickHandler(false);
                }}
              >
                <div className={classes.cardContent}>
                  {eventName}
                  <div className={classes.icon}>
                    {eventName === "Technology" ? (
                      <Coding />
                    ) : eventName === "Business" ? (
                      <Case />
                    ) : eventName === "Startup" ? (
                      <Startup />
                    ) : eventName === "ECommerce" ? (
                      <Ecommerce />
                    ) : eventName === "Ads" ? (
                      <Ads />
                    ) : eventName === "Blockchain" ? (
                      <Blockchain />
                    ) : eventName === "Finance" ? (
                      <Finance />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  const pageDisplay = showMockEventTypeModal ? mockEventTypeModal : defaultPage;
  return (
    <motion.div
      variants={containerVariants}
      key="selectEventPage"
      initial="hidden"
      animate="visible"
      exit="exit"
      className={classes.page}
    >
      {pageDisplay}
    </motion.div>
  );
};

export default SelectEventPage;
