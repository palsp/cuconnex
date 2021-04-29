import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { EventLists, MemberLists, SearchBar } from "@smartComponents/index";
import { Heading, Subtitle } from "@dumbComponents/UI/index";
import { ArrowLeft } from "@icons/index";
import classes from "./SelectMemberPrompt.module.css";
import CreateTeamPrompt from "../CreateTeamPrompt/CreateTeamPrompt";
import CreateTeamPage from "../CreateTeamPage";
import { motion } from "framer-motion";
import { UsersData } from "@src/mockData/Models";
import { IEventData, IUser, IUserFriend } from "@src/models";
import { fetchEventsDataAPI, fetchFriendsDataAPI } from "@src/api";
import SelectMemberPrompt from "../SelectMemberPrompt/SelectMemberPrompt";
import EventListForPrompt from "@smartComponents/EventLists/EventListForPrompt";

const SelectEventPrompt: React.FC = () => {
  const [clickSelectEvent, setClickSelectEvent] = useState<boolean>(true);
  const [clickSelectMember, setClickSelectMember] = useState<boolean>(false);
  const [clickSelectScope, setClickSelectScope] = useState<boolean>(false);
  const [eventLists, setEventLists] = useState<IEventData[] | []>([]);
  const [selectedEventLists, setSelectedEventLists] = useState<IEventData>();

  useEffect(() => {
    fetchEventsHandler();
  }, []);
  const fetchEventsHandler = async () => {
    const eventsData = await fetchEventsDataAPI();
    console.log("SUCCESS fetchEventsHandler", eventsData.data.events);
    setEventLists(eventsData.data.events);
  };
  const inviteClickedHandler = () => {
    setClickSelectEvent(false);
    setClickSelectMember(true);
    setClickSelectScope(false);
  };
  const backClickedHandler = () => {
    setClickSelectScope(true);
    setClickSelectMember(false);
    setClickSelectEvent(false);
  };
  const selectedEventHandler = (e: IEventData) => {
    setSelectedEventLists(e);
  };
  const selectPrompt =
    clickSelectEvent === true ? (
      <div>
        <div className={classes.divHeading}>
          <div className={classes.divFixed}>
            <div className={classes.relativeArrow}>
              <Redirect to="/createteam">
                <ArrowLeft />
              </Redirect>
            </div>
            <Heading value="Select Events" size="small-medium" />

            <div onClick={backClickedHandler} className={classes.arrowDiv}>
              <ArrowLeft />
            </div>
            <div className={classes.searchDiv}>
              <SearchBar value="Search By Event Name" />
            </div>
          </div>
        </div>
        <div className={classes.memberListsDiv}>
          <EventListForPrompt
            selectEventHandler={selectedEventHandler}
            events={eventLists}
          />
        </div>
      </div>
    ) : clickSelectMember === true ? (
      <SelectMemberPrompt />
    ) : (
      <div>
        <CreateTeamPage />
      </div>
    );

  return <div>{selectPrompt}</div>;
};

export default SelectMemberPrompt;
