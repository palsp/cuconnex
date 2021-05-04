import React, { useState } from "react";
import classes from "./SelectTeamPage.module.css";
import { TeamLists, EventCards } from "@smartComponents/index";
import { ArrowLeft } from "@dumbComponents/UI/Icons";
import { Link } from "react-router-dom";
import { Heading } from "@dumbComponents/UI";
import PageTitle from "@dumbComponents/UI/PageTitle/PageTitle";
interface Props {
  location: {
    state: {
      events: {
        id: number;
        "event-name": string;
        bio: string;
        location: string;
        registration: boolean;
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
        status?: string;
      };
    };
  };
  history: {
    goBack: () => void;
  };
}
const SelectTeamPage: React.FC<Props> = (props) => {
  const goBack = () => {
    props.history.goBack();
  };
  return (
    <div className={classes.page}>
      <PageTitle goBack={goBack} size="small-medium" text={"Team List"} />
      <div className={classes.eventcardsDiv}>
        <EventCards events={props.location?.state?.events}></EventCards>
      </div>
      <div className={classes.teamContainer}>
        <div className={classes.teamDiv}>Teams</div>
      </div>
      <div className={classes.teamListsDiv}>
        <TeamLists />
      </div>
    </div>
  );
};

export default SelectTeamPage;
