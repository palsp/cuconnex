import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import classes from "./RatingPage.module.css";
import { RatingLists } from "@smartComponents/index";
import { Heading, Button, PageTitle } from "@dumbComponents/UI/index";
import { ArrowLeft } from "@dumbComponents/UI/Icons/index";
import { IFetchTeam, IUser, IRateUser } from "@src/models";
import { fetchRateTeamMembersAPI, rateUserAPI } from "@api/index";
import { UserContext } from "@context/UserContext";
import { ErrorContext } from "@context/ErrorContext";

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
  const { userData } = useContext(UserContext);

  const { setErrorHandler } = useContext(ErrorContext);

  // const [allRated, setAllRated] = useState<boolean>(true);

  const [rated, setRated] = useState<boolean>(false);

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

  useEffect(() => {
    fetchRateTeamMembersHandler().then((users: IUser[]) => {
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
  }, []);

  const enableCheckHandler = () => {
    let enable = true;
    ratings.forEach((rating) => {
      enable = enable && rating.rating != null;
    });
    return enable;
  };

  const onSubmitHandler = () => {
    ratings.forEach(async (rating: Rating) => {
      const ratedUser: IRateUser = {
        rateeId: rating.user.id,
        ratings: rating.rating,
      };
      console.log(
        `User ID: ${ratedUser.rateeId}, User Rating: ${ratedUser.ratings}`
      );
      try {
        const resultResponse = await rateUserAPI(ratedUser);
        console.log(
          "Successfully rate a user in the team",
          resultResponse.data
        );
      } catch (e) {
        console.log(
          "ERRORS occured while sent a response to the user in the team",
          e
        );
        setErrorHandler(e.response.data.errors[0].message);
      }
    });
    setTimeout(() => {
      setRedirect(<Redirect to={{ pathname: "/landing" }} />);
    }, 1500);
  };

  return (
    <div>
      <PageTitle
        goBack={goBackPreviousPageHandler}
        size="small-medium"
        text="Congratulations!"
      />
      {/* <div className={classes.header}>
        <div
          onClick={goBackPreviousPageHandler}
          className={classes.relativeArrow}
        >
          <ArrowLeft />
        </div>
        <div className={classes.head}>
          <Heading value="Congratulations!" />
        </div>
      </div> */}
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
        <div className={classes.ratingLists}>
          {ratings.length > 0 ? <RatingLists ratings={ratings} /> : "loading"}
        </div>

        {/* <Button value="Submit" disabled={allRated} onClick={onSubmitHandler} /> */}
        <div className={classes.submitButton}>
          <Button
            value="Submit"
            disabled={enableCheckHandler()}
            onClick={onSubmitHandler}
          />
        </div>

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
