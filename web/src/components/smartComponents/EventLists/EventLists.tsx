import classes from "./EventLists.module.css";
import React, { useEffect, useState } from "react";
import GeneralLists from "@smartComponents/GeneralLists/GeneralLists";
import { Link } from "react-router-dom";
const eventArray = [
  {
    name: "ISE Hackathon",
    description:
      "The biggest Chula's business case competition with more than 100 million baht awards",
    status: "Open for application",
  },
  {
    name: "BASCI Hackathon2",
    description:
      "The biggest Chula's business case competition with more than 100 million baht awards",
    status: "Open for application",
  },
  {
    name: "BSAC Hackathon",
    description:
      "The biggest Chula's business case competition with more than 100 million baht awards",
    status: "Closed",
  },
  {
    name: "BBA Hackathon",
    description:
      "The biggest Chula's business case competition with more than 100 million baht awards",
    status: "Upcoming",
  },
];
interface Props {
  event?: {
    name: string;
    description: string;
    status: string;
  };
  selectedevent?: {
    name: string;
    description: string;
    status: string;
  };
}
const EventLists: React.FC<Props> = (props) => {
  const mappeddefault = (
    <div className={classes.mainDiv}>
      {eventArray.map((sampleevent, index) => {
        return (
          <div key={index} className={classes.deleteunderlineDiv}>
            <Link
              to={{
                pathname: "/selectteams",
                state: {
                  event: {
                    name: eventArray[index].name,
                    description: eventArray[index].description,
                    status: eventArray[index].status,
                  },
                },
              }}
            >
              <div className={classes.listDiv}>
                <GeneralLists key={index} event={sampleevent}></GeneralLists>
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
