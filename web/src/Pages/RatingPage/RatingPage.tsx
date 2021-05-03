import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import classes from "./RatingPage.module.css";
import { RatingLists } from "@smartComponents/index";
import { Heading, Button } from "@dumbComponents/UI/index";
import { ArrowLeft } from "@dumbComponents/UI/Icons/index";
import { IFetchTeam, IUser, IFetchRateTeamNotification } from "@src/models";
import { fetchTeamMembersAPI, fetchRateTeamMembersAPI } from "@api/index";

interface Props {
  location: {
    state: {
      team: IFetchTeam;
    };
  };
  history: {
    goBack: () => void;
  };
}

const RatingPage: React.FC<Props> = (props) => {
  const [teamMemberLists, setTeamMemberLists] = useState<IUser[] | []>([]);
  const [rateTeamMemberLists, setRateTeamMemberLists] = useState<IUser[] | []>(
    []
  );
  const [submit, setSubmit] = useState<boolean>(false);
  const goBackPreviousPageHandler = () => {
    props.history.goBack();
  };
  const fetchTeamMembersHandler = async () => {
    const teamData = await fetchTeamMembersAPI(props.location.state.team.name);
    console.log("fetchTeamMembersHandler", teamData.data.users);
    return teamData.data.users;
  };
  const fetchRateTeamMembersHandler = async () => {
    const teamData = await fetchRateTeamMembersAPI(
      props.location.state.team.name
    );
    console.log("fetchTeamMembersHandler", teamData.data.rates);
    return teamData.data.rates;
  };
  useEffect(() => {
    fetchTeamMembersHandler().then((value: IUser[] | []) =>
      setTeamMemberLists(value)
    );
    fetchRateTeamMembersHandler().then((value: IUser[] | []) =>
      setRateTeamMemberLists(value)
    );
  }, []);
  const onClickHandler = () => {
    // setSubmit((prevState) => !prevState);
    console.log("huh");
  };
  return (
    <div>
      <div className={classes.header}>
        <div
          onClick={goBackPreviousPageHandler}
          className={classes.relativeArrow}
        >
          <ArrowLeft />
        </div>
        <div className={classes.head}>
          <Heading value="Congratulations!" />
        </div>
      </div>
      <div>
        <div className={classes.textBox}>
          <div className={classes.teamHeading}>
            You Successfully worked with
          </div>
          <div className={classes.teamName}>
            {props.location.state.team?.name}
          </div>
          <div className={classes.teamSubHeading}>
            {
              "We would appreciate if you spend a few moment \ngiving stars for your teammates!"
            }
          </div>
        </div>
        <div className={classes.textFlex}>
          <div className={classes.rateTeammates}>Rate Your Teammates</div>
          <div className={classes.noThanks}>No, Thanks</div>
        </div>
        <RatingLists members={teamMemberLists} submit={submit} />
        {/* <RatingLists members={rateTeamMemberLists} submit={submit} /> */}
        {/* <Redirect to="/landing"> */}
        <Button value="Submit" onClick={onClickHandler} />
        {/* </Redirect> */}

        <div className={classes.ratingDetail}>
          {
            "Your rating will be used as the team's future \nrecommendation and reliability :D"
          }
        </div>
      </div>
    </div>
  );
};

export default RatingPage;
