import React, { useState, useContext } from "react";
import { Button } from "@dumbComponents/UI/index";
import { createEventsAPI } from "@api/index";
import { ICreateEventsData, IFetchEventsDataResult } from "@models/index";
const postEventsHandler = async (eventsData: ICreateEventsData) => {
  try {
    const resultEvents = await createEventsAPI(eventsData);
    console.log("Successfully sent a POST request to events", resultEvents);
  } catch (e) {
    console.log("ERRORS occured while POST /api/events/", e);
  }
};
const sampleevent = {
    "event-name": "ISE Hackathon",
    bio: "Biggest competition in ISE",
    "start-date": {
      month: 1,
      day: 1,
      year: 2000,
      time: {
        hour: 12,
        minute: 0,
        second: 0,
      },
    },
    "end-date": {
      month: 4,
      day: 10,
      year: 2000,
      time: {
        hour: 12,
        minute: 0,
        second: 0,
      },
    },
};
const PushPage: React.FC = () => {
  return (
    <Button
      value="press to send data"
      onClick={() => postEventsHandler(sampleevent)}
    ></Button>
  );
};

export default PushPage;
