import React from "react";
import classes from "./TeamRatingLists.module.css";
import { ITeam } from "@src/models/index";
import { TeamRatingList } from "@smartComponents/index";

interface Props {
  teams: ITeam[];
}

const TeamRatingLists: React.FC<Props> = (props) => {
  return (
    <div>
      {props.teams?.map((TeamRating: ITeam, index: number) => {
        return (
          <div key={index}>
            <TeamRatingList key={index} team={TeamRating} />
          </div>
        );
      })}
    </div>
  );
};

export default TeamRatingLists;
