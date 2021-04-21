import React from "react";
import { Link } from "react-router-dom";
import classes from "./SelectEventPage.module.css";
import { Heading } from "@dumbComponents/UI";
import { ArrowLeft } from "@dumbComponents/UI/Icons";
import EventLists from "@smartComponents/EventLists/EventLists";
import Tag from "@dumbComponents/UI/Tag/Tag";
const SelectEventPage: React.FC = () => {
  return (
    <div className={classes.mainDiv}>
      <div className={classes.headingContainerDiv}>
        <div className={classes.arrowDiv}>
          <Link to="/landing">
            <ArrowLeft />
          </Link>
        </div>
        <div className={classes.headingDiv}>
          <Heading value="Technology"></Heading>
        </div>
      </div>
      <div>
        <Tag />
      </div>
      <div className={classes.eventDiv}>
        <EventLists />
      </div>
    </div>
  );
};

export default SelectEventPage;
