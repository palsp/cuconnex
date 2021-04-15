import React from "react";
import { Heading, Subtitle } from "@dumbComponents/UI/index";
import { ProfilePic } from "@smartComponents/index";
import classes from "./PeopleList.module.css";

interface Props {
  people: {
    name: string;
    profilePic: string;
    interest: string;
  };
}

const PeopleList: React.FC<Props> = (props) => {
  return (
    <div className={classes.divPeople}>
      <div className={classes.divProfile}>
        <ProfilePic size="mini" />
      </div>
      <div className={classes.divName}>
        <Subtitle value={props.people.name} color="black" size="small-medium" />
      </div>
      <div className={classes.divInterest}>
        <Subtitle value={props.people.interest} color="pink" />
      </div>
    </div>
  );
};
export default PeopleList;
