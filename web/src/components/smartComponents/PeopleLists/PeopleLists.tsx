import React from "react";
import { PeopleList } from "@smartComponents/index";
import { Heading } from "@dumbComponents/UI/index";
import mockPeopleLists from "@src/mockData/mockPeopleLists";
import classes from "./PeopleLists.module.css";

const PeopleLists: React.FC = () => {
  return (
    <div>
      <div className={classes.divHeading}>
        <Heading value="People" />
      </div>
      {mockPeopleLists.map((person, index) => {
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
