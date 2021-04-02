import classes from "./EventLists.module.css";
import React from "react";
import GeneralLists from "@smartComponents/GeneralLists/GeneralLists";
import { Heading } from "@dumbComponents/UI";
import { ArrowLeft } from "@dumbComponents/UI/Icons";
const eventArray = [
  {
    name: "ISE Hackathon",
    description:
      "The biggest Chula's business case competition with more than 100 million baht awards",
    status: "Open for application",
  },
  {
    name: "ISE Hackathon2",
    description:
      "The biggest Chula's business case competition with more than 100 million baht awards",
    status: "Open for application",
  },
  {
    name: "ISE Hackathon3",
    description:
      "The biggest Chula's business case competition with more than 100 million baht awards",
    status: "Closed",
  },
  {
    name: "ISE Hackathon4",
    description:
      "The biggest Chula's business case competition with more than 100 million baht awards",
    status: "Upcoming",
  },
];
const EventLists: React.FC = () => {
  return (
    <div className={classes.mainDiv}>
      {eventArray.map((sampleevent, index) => {
        return (
          <div className={classes.listDiv}>
            <GeneralLists key={index} event={sampleevent} />
          </div>
        );
      })}
    </div>
  );
};

export default EventLists;
