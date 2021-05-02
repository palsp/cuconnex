import React, { useState, useEffect, useContext } from "react";
import classes from "./RatingPage.module.css";
import { RatingLists } from "@smartComponents/index";
import { Heading, Button } from "@dumbComponents/UI/index";
import { ArrowLeft } from "@dumbComponents/UI/Icons/index";
import { ITeam, IUser } from "@src/models";
import { fetchTeamMembersAPI } from "@api/index";
import { UserContext } from "@context/UserContext";
interface Props {
  location: {
    state: {
      team: ITeam;
    };
  };
  history: {
    goBack: () => void;
  };
}

const RatingPage: React.FC<Props> = (props) => {
  const [teamMemberLists, setTeamMemberLists] = useState<IUser[] | []>([]);
  const { userData } = useContext(UserContext);
  const goBackPreviousPageHandler = () => {
    props.history.goBack();
  };
  const fetchTeamMembersHandler = async () => {
    const teamData = await fetchTeamMembersAPI(props.location.state.team.name);
    console.log("fetchTeamMembersHandler", teamData.data.users);
    return teamData.data.users;
  };
  useEffect(() => {
    fetchTeamMembersHandler().then((value: IUser[] | []) =>
      setTeamMemberLists(value)
    );
  }, []);
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
        <RatingLists members={teamMemberLists} />
        <Button value="Submit" />
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
