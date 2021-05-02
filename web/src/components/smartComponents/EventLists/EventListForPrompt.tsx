import classes from "./EventLists.module.css";
import React, { useEffect, useState } from "react";
import GeneralLists from "@smartComponents/GeneralLists/GeneralLists";
import { Link } from "react-router-dom";
import { IEventData } from "@src/models";

interface Props {
  events: IEventData[] | [];
  selectEventHandler: any;
}

const EventLists: React.FC<Props> = (props) => {
  const [click, setClick] = useState<boolean>(false);
  const selectEventListHandler = (index: number) => {
    props.selectEventHandler(props.events[index]);
    console.log("selected events = ", props.events[index]);
  };
  const mappeddefault = (
    <div className={classes.mainDiv}>
      {props.events?.map((eventpulled: IEventData, index: number) => {
        return (
          <div key={index} className={classes.deleteunderlineDiv}>
            <div
              onClick={() => {
                setClick(true);
                selectEventListHandler(index);
              }}
              className={classes.promptListDiv}
            >
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
