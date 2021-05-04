import React, { useEffect, useState } from "react";
import classes from "./SelectTeamPage.module.css";
import { TeamLists, EventCards } from "@smartComponents/index";
import { ArrowLeft } from "@dumbComponents/UI/Icons";
import { Link } from "react-router-dom";
import { Heading } from "@dumbComponents/UI";
import PageTitle from "@dumbComponents/UI/PageTitle/PageTitle";
import { fetchEventTeamAPI, fetchTeamEventAPI } from "@src/api";
import { IFetchTeam, IEventData } from "@src/models";
interface Props {
  location: {
    state: {
      events: IEventData;
    };
  };
  history: {
    goBack: () => void;
  };
}
const SelectTeamPage: React.FC<Props> = (props) => {
  const [teamLists, setTeamLists] = useState<IFetchTeam[] | []>([]);
  const goBack = () => {
    props.history.goBack();
  };
  useEffect(() => {
    fetchTeamHandler(props.location.state.events.id);
  }, []);
  const fetchTeamHandler = async (eventId: number) => {
    const teamResult = await fetchEventTeamAPI(eventId);
    console.log(teamResult.data);
    setTeamLists(teamResult.data.teams);
    return teamResult;
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
        <TeamLists teams={teamLists} />
      </div>
    </div>
  );
};

export default SelectTeamPage;
