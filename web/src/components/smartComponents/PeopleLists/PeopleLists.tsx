import React from "react";
import { PeopleList } from "@smartComponents/index";
import { Heading } from "@dumbComponents/UI/index";
import mockPeopleLists from "@src/mockData/mockPeopleLists";
import classes from "./PeopleLists.module.css";
import { PeopleListsData } from "@src/mockData/Models";

interface Props{
  peoplelist:PeopleListsData[] | []
}
const PeopleLists: React.FC<Props> = (props) => {
  return (
    <div>
      {/* <div className={classes.divHeading}>
        <Heading value="People" />
      </div> */}
      {props.peoplelist.map((person:PeopleListsData, index:number) => {
        return (
          <div key={index}>
            <PeopleList key={index} people={person} />
          </div>
        );
      })}
    </div>
  );
};
export default PeopleLists;
