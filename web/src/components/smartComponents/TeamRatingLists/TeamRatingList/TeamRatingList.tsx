import React from "react";
import classes from "./TeamRatingList.module.css";
import { Link } from "react-router-dom";
import {
  Star,
  ChevronRight,
  CircleFilledGrey,
} from "@dumbComponents/UI/Icons/index";
import { IFetchTeam } from "@src/models/index";

interface Props {
  team: IFetchTeam;
}
const TeamRatingList: React.FC<Props> = (props) => {
  return (
    <div className={classes.teamRatingList}>
      <div className={classes.teamContainer}>
        <div className={classes.star}>
          <Star />
        </div>
        <div className={classes.middleContainer}>
          <div className={classes.teamName}>
            {`Let's give a rating for \n${props.team.name}`}
          </div>
          <div className={classes.textDescription}>
            {"How was your working experience?"}
          </div>
        </div>
        <div className={classes.round}>
          <Link
            style={{ textDecoration: "none" }}
            to={{
              pathname: "/rating",
              state: {
                team: props.team,
              },
            }}
          >
            <CircleFilledGrey>
              <div className={classes.chevron}>
                <ChevronRight></ChevronRight>
              </div>
            </CircleFilledGrey>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamRatingList;
