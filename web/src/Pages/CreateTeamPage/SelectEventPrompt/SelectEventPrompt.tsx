import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { EventLists, MemberLists, SearchBar } from "@smartComponents/index";
import { Heading, Subtitle } from "@dumbComponents/UI/index";
import { ArrowLeft } from "@icons/index";
import classes from "./SelectEventPrompt.module.css";
import CreateTeamPage from "../CreateTeamPage";
import { IEventData, IUser, IUserFriend } from "@src/models";
import SelectMemberPrompt from "../SelectMemberPrompt/SelectMemberPrompt";
import EventListForPrompt from "@smartComponents/EventLists/EventListForPrompt";
import { mockEventLists } from "@src/mockData";
import { createEventsAPI, fetchEventsDataAPI } from "@src/api";

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
    setClickSelectEvent(false);
    setClickSelectScope(false);
    setClickSelectMember(true);
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
      <SelectMemberPrompt event={selectedEventLists} />
    ) : (
      <div>
        <CreateTeamPage />
      </div>
    );

  return <div>{selectPrompt}</div>;
};

export default SelectEventPrompt;
