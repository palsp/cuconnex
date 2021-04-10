import React from "react";
import { Link } from "react-router-dom";
import classes from "./SelectEventPage.module.css";
import { Heading, Tag } from "@dumbComponents/UI/index";
import { ArrowLeft } from "@icons/index";
import { EventLists } from "@smartComponents/index";
interface Props {
  location: {
    state: {
      eventstatus: string;
    };
  };
}
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
