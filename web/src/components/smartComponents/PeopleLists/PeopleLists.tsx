import React from "react";
import { PeopleList } from "@smartComponents/index";
import { Heading } from "@dumbComponents/UI/index";
import classes from "./PeopleLists.module.css";
import { IUser } from "@src/models";
import { Link } from "react-router-dom";
import { mockPeopleLists } from "@src/mockData";

interface Props {
  peoplelist: IUser[] | [];
}
const PeopleLists: React.FC<Props> = (props) => {
  return (
    <div>
      {props.peoplelist.map((person: IUser, index: number) => {
        return (
          <div className={classes.linkDiv} key={index}>
            <Link
              to={{
                pathname: "/profile",
                state: {
                  users: props.peoplelist[index],
                },
              }}
            >
              <PeopleList key={index} people={props.peoplelist[index]} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default PeopleLists;
