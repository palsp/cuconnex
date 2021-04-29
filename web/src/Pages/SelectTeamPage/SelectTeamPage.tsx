import React, { useState } from "react";
import classes from "./SelectTeamPage.module.css";
import { TeamLists, EventCards } from "@smartComponents/index";
import { ArrowLeft } from "@dumbComponents/UI/Icons";
import { Link } from "react-router-dom";
import { Heading } from "@dumbComponents/UI";
interface Props {
  location: {
    state: {
      events: {
        "event-name": string;
        bio: string;
        status: string;
        "start-date": {
          month: number;
          day: number;
          year: number;
          time: {
            hour: number;
            minute: number;
            second: number;
          };
        };
        "end-date": {
          month: number;
          day: number;
          year: number;
          time: {
            hour: number;
            minute: number;
            second: number;
          };
        };
      };
    };
  };
}
const SelectTeamPage: React.FC<Props> = (props) => {
  return (
    <>
      <div className={classes.divHeading}>
        <div className={classes.divFixed}>
          <div className={classes.relativeArrow}>
            <Link to="/selectevents">
              <ArrowLeft />
            </Link>
          </div>
          <Heading
            data-test="friends-page-header"
            value="Team List"
            size="medium"
          />
        </div>
        <div className={classes.eventcardsDiv}>
          {/* <EventCards events={props.location?.state?.events}></EventCards> */}
        </div>
      </div>
      <div className={classes.teamContainer}>
        <div className={classes.teamDiv}>Teams</div>
      </div>
      <div className={classes.teamListsDiv}>
        <TeamLists />
      </div>
    </>
  );
};

export default SelectTeamPage;
