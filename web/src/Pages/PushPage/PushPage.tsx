import React, { useState, useContext } from "react";
import { Button } from "@dumbComponents/UI/index";
import { addFriendAPI, callTeamOfUserAPI, createEventsAPI } from "@api/index";
import { IAddFriend, IEventData } from "@src/models";
import MemberTag from "@smartComponents/MemberTag/MemberTag/MemberTag";
import MemberTags from "@smartComponents/MemberTag/MemberTags";
import { mockEventLists } from "@src/mockData";
const postEventsHandler = async (eventsData: IEventData) => {
  try {
    const resultEvents = await createEventsAPI(eventsData);
    console.log("Successfully sent a POST request to events", resultEvents);
  } catch (e) {
    console.log("ERRORS occured while POST /api/events/", e);
  }
};
const addFriendHandler = async (friendId: IAddFriend) => {
  try {
    const resultAdd = await addFriendAPI(friendId);
    console.log("Successfully sent a POST request to friend", resultAdd);
  } catch (e) {
    console.log("ERRORS occured while POST /api/friends/", e);
  }
};
const callTeamHandler = async (userId: string) => {
  const relationResult = await callTeamOfUserAPI(userId);
  console.log(relationResult);
  return relationResult;
};
// const sampleteam = callTeamHandler("6131822233");
// const samplefriend = {
//   userId: "6131824722",
// };
// const samplerequest = addFriendHandler(samplefriend);
// console.log("test callteamAPI" + sampleteam);
const sampleevent = {
  "event-name": "BSAC Hackathon",
  bio: "Biggest competition in BSAC",
  status: "Ongoing",
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
        onClick={() => postEventsHandler(mockEventLists[1])}
      ></Button>
    </div>
  );
};

export default PushPage;
