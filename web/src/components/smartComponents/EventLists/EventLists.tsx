import classes from "./EventLists.module.css";
import React, { useEffect, useState } from "react";
import GeneralLists from "@smartComponents/GeneralLists/GeneralLists";
import { Link } from "react-router-dom";

interface Props {
  allevents: {
    events: {
      id: number;
      eventName: string;
      bio: string;
      location: string;
      status?: string;
      startDate: {
        date: {
          month: number;
          day: number;
          year: number;
        };
        time: {
          hour: number;
          minute: number;
          second: number;
        };
      };
      endDate: {
        date: {
          month: number;
          day: number;
          year: number;
        };
        time: {
          hour: number;
          minute: number;
          second: number;
        };
      };
    }[];
  }[];
}

const EventLists: React.FC<Props> = (props) => {
  const mappeddefault = (
    <div className={classes.mainDiv}>
      {props.allevents.map((eventpulled, index) => {
        return (
          <div key={index} className={classes.deleteunderlineDiv}>
            <Link
              to={{
                pathname: "/selectteams",
                state: {
                  event: props.allevents[index],
                },
              }}
            >
              <div className={classes.listDiv}>
                <GeneralLists key={index} allevents={eventpulled}></GeneralLists>
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
