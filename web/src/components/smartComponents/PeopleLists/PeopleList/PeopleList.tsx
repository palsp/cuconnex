import React from "react";
import { Heading, Subtitle } from "@dumbComponents/UI/index";
import { ProfilePic } from "@smartComponents/index";
import classes from "./PeopleList.module.css";
import { IUser } from "@src/models";

interface Props {
  people: IUser;
}

const PeopleList: React.FC<Props> = (props) => {
  return (
    <div className={classes.divPeople}>
      <div className={classes.divProfile}>
        <ProfilePic size="mini" PicUrl={props.people.image} />
      </div>
      <div className={classes.divName}>
        <Subtitle value={props.people.name} color="black" size="small-medium" />
      </div>
      <div className={classes.divInterest}>
        <Subtitle value={props.people.faculty} color="pink" />
      </div>
    </div>
  );
};
export default PeopleList;
