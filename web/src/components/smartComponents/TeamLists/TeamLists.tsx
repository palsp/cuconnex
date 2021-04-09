import classes from "./TeamLists.module.css";
import React from "react";
import GeneralLists from "@smartComponents/GeneralLists/GeneralLists";
const eventArray = [
  {
    name: "ISE Hackathon",
    compatibility: "Very compatible with you!",
    projectname: "CU CONNEX Project",
    status: "We are looking for",
    category: {
      technology: true,
      business: true,
      design: true,
    },
  },
  {
    name: "ISE Hackathon",
    compatibility: "Very compatible with you!",
    projectname: "CU CONNEX Project",
    status: "We are looking for",
    category: {
      technology: true,
      business: true,
      design: true,
    },
  },
  {
    name: "ISE Hackathon",
    compatibility: "Not so compatible!",
    projectname: "CU CONNEX Project",
    status: "We are looking for",
    category: {
      technology: true,
      business: true,
      design: true,
    },
  },
  {
    name: "ISE Hackathon",
    compatibility: "Compatible with you!",
    projectname: "CU CONNEX Project",
    status: "We are looking for",
    category: {
      technology: true,
      business: true,
      design: true,
    },
  },
];
const TeamLists: React.FC = () => {
  return (
    <div className={classes.mainDiv}>
      {eventArray.map((sampleteam, index) => {
        return (
          <div key={index} className={classes.listDiv}>
            <GeneralLists team={sampleteam} />
          </div>
        );
      })}
    </div>
  );
};

export default TeamLists;
