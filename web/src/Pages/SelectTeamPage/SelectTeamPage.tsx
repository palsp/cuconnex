import React from "react";
import classes from "./SelectTeamPage.module.css";
import TeamLists from "@smartComponents/TeamLists/TeamLists";
import { Heading } from "@dumbComponents/UI";
import { ArrowLeft } from "@dumbComponents/UI/Icons";

const SelectTeamPage: React.FC = () => {
  return (
    <div className={classes.mainDiv}>
      <div className={classes.headerContainer}>
      <div className={classes.arrowDiv}>
          <ArrowLeft />{" "}
        </div>
        <div className={classes.headingDiv}>
          Team List
        </div>
      </div>
      <TeamLists />
    </div>
  );
};

export default SelectTeamPage;
