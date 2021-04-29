import classes from "./EventLists.module.css";
import React, { useEffect, useState } from "react";
import GeneralLists from "@smartComponents/GeneralLists/GeneralLists";
import { Link } from "react-router-dom";
import { IEventData } from "@src/models";

interface Props {
  events: IEventData[] | [];
}

const EventLists: React.FC<Props> = (props) => {
  const mappeddefault = (
    <div className={classes.mainDiv}>
      {props.events?.map((eventpulled: IEventData, index: number) => {
        return (
          <div key={index} className={classes.deleteunderlineDiv}>
            <Link
              to={{
                pathname: "/selectteams",
                state: {
                  events: props.events[index],
                },
              }}
            >
              <div className={classes.listDiv}>
                <GeneralLists key={index} events={eventpulled}></GeneralLists>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
  return <div>{mappeddefault}</div>;
};

export default EventLists;
