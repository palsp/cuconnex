import classes from "./EventLists.module.css";
import React, { useEffect, useState } from "react";
import GeneralLists from "@smartComponents/GeneralLists/GeneralLists";
import { Link } from "react-router-dom";
import { IEventData } from "@src/models";

interface Props {
  events: IEventData[] | [];
  selectEventHandler: (e: IEventData) => void;
}

const EventLists: React.FC<Props> = (props) => {
  const selectEventHandler = (event: IEventData) => {
    props.events;
  };
  const mappeddefault = (
    <div className={classes.mainDiv}>
      {props.events?.map((eventpulled: IEventData, index: number) => {
        return (
          <div key={index} className={classes.deleteunderlineDiv}>
            <div onClick={() => selectEventHandler} className={classes.listDiv}>
              <GeneralLists key={index} events={eventpulled}></GeneralLists>
            </div>
          </div>
        );
      })}
    </div>
  );
  return <div>{mappeddefault}</div>;
};

export default EventLists;
