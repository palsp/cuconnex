import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import classes from "./RatingPage.module.css";
import { RatingLists } from "@smartComponents/index";
import { Heading, Button } from "@dumbComponents/UI/index";
import { ArrowLeft } from "@dumbComponents/UI/Icons/index";
import { IFetchTeam, IUser } from "@src/models";
import { fetchTeamMembersAPI, fetchRateTeamMembersAPI } from "@api/index";
import { UserContext } from "@src/context/UserContext";

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

export interface Rating {
  user: IUser;
  rating: number | null;
  ratingId: number;
  setRating: React.Dispatch<React.SetStateAction<Rating[]>>;
}

const RatingPage: React.FC<Props> = (props) => {
  const [rateTeamMemberLists, setRateTeamMemberLists] = useState<IUser[] | []>(
    []
  );
  const [teamMemberLists, setTeamMemberLists] = useState<IUser[] | []>([]);

  const { userData } = useContext(UserContext);

  const [allRated, setAllRated] = useState<boolean>(true);

  const [submit, setSubmit] = useState<boolean>(false);

  const [redirect, setRedirect] = useState<JSX.Element>();

  const [ratings, setRatings] = useState<Rating[]>([]);

  const goBackPreviousPageHandler = () => {
    props.history.goBack();
  };

  const fetchRateTeamMembersHandler = async () => {
    const teamData = await fetchRateTeamMembersAPI(
      props.location.state.team.name
    );
    console.log("fetchTeamMembersHandler", teamData.data.ratees);
    return teamData.data.ratees;
  };

  const fetchTeamMembersHandler = async () => {
    const teamData = await fetchTeamMembersAPI(props.location.state.team.name);
    console.log("fetchTeamMembersHandler", teamData.data.users);
    return teamData.data.users;
  };

  useEffect(() => {
    fetchTeamMembersHandler().then((users: IUser[]) => {
      const newRatings: Rating[] = [];
      const notMe = users.filter((user) => user.id !== userData.id);
      notMe.forEach((user: IUser, index: number) => {
        const newUser = {
          user: user,
          rating: null,
          ratingId: index,
          setRating: setRatings,
        };
        newRatings.push(newUser);
      });
      setRatings(newRatings);
    });
    console.log("Rating: ", ratings);
    // ratings.forEach((value) => {
    //   if (value.rating === null) {
    //     setAllRated((prevState) => (prevState = prevState && false));
    //   }
    // });

    // fetchTeamMembersHandler().then((value: IUser[] | []) =>
    //   setTeamMemberLists(value)
    // );
  }, []);

  const onSubmitHandler = () => {
    setTimeout(() => {
      setRedirect(<Redirect to={{ pathname: "/landing" }} />);
    }, 1500);
    setSubmit(true);
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
        {/* <RatingLists members={teamMemberLists} submit={submit} /> */}
        {ratings.length > 0 ? (
          <RatingLists ratings={ratings} submit={submit} />
        ) : (
          "loading"
        )}

        <Button value="Submit" disabled={allRated} onClick={onSubmitHandler} />
        {redirect}
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
