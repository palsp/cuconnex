import React, { useState, useContext } from "react";
import { Button } from "@dumbComponents/UI/index";
import { createEventsAPI } from "@api/index";
import { IEventData } from "@src/models";
import MemberTag from "@smartComponents/MemberTag/MemberTag/MemberTag";
import MemberTags from "@smartComponents/MemberTag/MemberTags";
const postEventsHandler = async (eventsData: IEventData) => {
  try {
    const resultEvents = await createEventsAPI(eventsData);
    console.log("Successfully sent a POST request to events", resultEvents);
  } catch (e) {
    console.log("ERRORS occured while POST /api/events/", e);
  }
};
const sampleevent = {
    "event-name": "BSAC Hackathon",
    bio: "Biggest competition in BSAC",
    status:"Ongoing",
    "start-date": {
      month: 5,
      day: 14,
      year: 2021,
      time: {
        hour: 12,
        minute: 0,
        second: 0,
      },
    },
    "end-date": {
      month: 6,
      day: 14,
      year: 2021,
      time: {
        hour: 12,
        minute: 0,
        second: 0,
      },
    },
};
const PushPage: React.FC = () => {
  return (
    <div>
    <Button
      value="press to send data"
      onClick={() => postEventsHandler(sampleevent)}
    ></Button>
    </div>
  );
};

export default PushPage;
