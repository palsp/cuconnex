import React, { useState } from "react";
import classes from "./SelectTeamPage.module.css";
import TeamLists from "@smartComponents/TeamLists/TeamLists";
import { ArrowLeft } from "@dumbComponents/UI/Icons";
import EventCards from "@smartComponents/EventCards/EventCards";
import { Link } from "react-router-dom";
interface Props {
  location: {
    state: {
      event: {
        name: string;
        description: string;
        status: string;
      };
    };
  };
}
const SelectTeamPage: React.FC<Props> = (props) => {
  return (
    <div className={classes.mainDiv}>
      <div className={classes.arrowheaderContainer}>
        <div className={classes.arrowDiv}>
          <Link to="/selectevents">
            <ArrowLeft />
          </Link>
        </div>
        <div className={classes.headerContainer}>
          <div className={classes.headingDiv}>Team List</div>
        </div>
      </div>
      <div className={classes.eventcardsDiv}>
        <EventCards event={props.location.state.event}></EventCards>
      </div>
      <div className={classes.teamContainer}>
        <div className={classes.teamDiv}>Team</div>
      </div>
      <TeamLists />
    </div>
  );
};

export default SelectTeamPage;
