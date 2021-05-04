import React, { useState, useContext } from "react";
import { Button } from "@material-ui/core";
import {
  addFriendAPI,
  callTeamOfUserAPI,
  createEventsAPI,
  fetchEventsDataAPI,
} from "@api/index";
import { IAddFriend, ICreateEventData } from "@src/models";
import MemberTag from "@smartComponents/MemberTag/MemberTag/MemberTag";
import MemberTags from "@smartComponents/MemberTag/MemberTags";
import { mockEventLists } from "@src/mockData";
const postEventsHandler = async (eventsData: ICreateEventData) => {
  try {
    const resultEvents = await createEventsAPI(eventsData);
    console.log("Successfully sent a POST request to events", resultEvents);
  } catch (e) {
    console.log("ERRORS occured while POST /api/events/", e);
  }
};
const fetchEventsHandler = async () => {
  try {
    const resultFetchEvent = await fetchEventsDataAPI();
    console.log("Successfully fetch events data", resultFetchEvent);
  } catch (e) {
    console.log("ERRORS occured while fetching /api/events/", e);
  }
};

// const addFriendHandler = async (friendId: IAddFriend) => {
//   try {
//     const resultAdd = await addFriendAPI(friendId);
//     console.log("Successfully sent a POST request to friend", resultAdd);
//   } catch (e) {
//     console.log("ERRORS occured while POST /api/friends/", e);
//   }
// };
// const callTeamHandler = async (userId: string) => {
//   const relationResult = await callTeamOfUserAPI(userId);
//   console.log(relationResult);
//   return relationResult;
// };
// const sampleteam = callTeamHandler("6131822233");
// const samplefriend = {
//   userId: "6131824722",
// };
// const samplerequest = addFriendHandler(samplefriend);
// console.log("test callteamAPI" + sampleteam);

const PushPage: React.FC = () => {
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          postEventsHandler(mockEventLists[1]);
          postEventsHandler(mockEventLists[0]);
          postEventsHandler(mockEventLists[2]);
        }}
      >
        Create 3 events
      </Button>
      <Button
        onClick={fetchEventsHandler}
        variant="contained"
        color="secondary"
      >
        Get Event
      </Button>
    </div>
  );
};

export default PushPage;
