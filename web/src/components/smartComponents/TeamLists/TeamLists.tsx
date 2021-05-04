import classes from "./TeamLists.module.css";
import React from "react";
import GeneralLists from "@smartComponents/GeneralLists/GeneralLists";
import { IFetchTeam, IFetchTeams } from "@src/models";
const eventArray = [
  {
    name: "Lawtech",
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
    name: "Laika",
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
    name: "Nature",
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
    name: "Suki",
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
interface Props {
  teams: IFetchTeam[];
}
const TeamLists: React.FC<Props> = (props) => {
  return (
    <div className={classes.mainDiv}>
      {props.teams.map((team, index) => {
        return (
          <div key={index} className={classes.listDiv}>
            <GeneralLists team={team} />
          </div>
        );
      })}
    </div>
  );
};

export default TeamLists;
