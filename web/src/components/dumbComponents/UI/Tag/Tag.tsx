import React, { useState } from "react";
import classes from "./Tag.module.css";
const Tag: React.FC = () => {
  const [clickAllTag, setClickAllTag] = useState(true);
  const [clickOngoingTag, setClickOngoingTag] = useState(false);
  const [clickUpcomingTag, setClickUpcomingTag] = useState(false);
  const [clickClosedTag, setClickClosedTag] = useState(false);
  const allTagClickedHandler = () => {
    setClickAllTag(true);
    setClickOngoingTag(false);
    setClickUpcomingTag(false);
    setClickClosedTag(false);
  };
  const ongoingTagClickedHandler = () => {
    setClickAllTag(false);
    setClickOngoingTag(true);
    setClickUpcomingTag(false);
    setClickClosedTag(false);
  };
  const upcomingTagClickedHandler = () => {
    setClickAllTag(false);
    setClickOngoingTag(false);
    setClickUpcomingTag(true);
    setClickClosedTag(false);
  };
  const closedTagClickedHandler = () => {
    setClickAllTag(false);
    setClickOngoingTag(false);
    setClickUpcomingTag(false);
    setClickClosedTag(true);
  };
  let cssArrayAll = null;
  let cssArrayOngoing = null;
  let cssArrayUpcoming = null;
  let cssArrayClosed = null;
  if (clickAllTag) {
    cssArrayAll = [classes.enablealltagDiv];
  } else {
    cssArrayAll = [classes.disablealltagDiv];
  }
  if (clickOngoingTag) {
    cssArrayOngoing = [classes.enableongoingtagDiv];
  } else {
    cssArrayOngoing = [classes.disableongoingtagDiv];
  }
  if (clickUpcomingTag) {
    cssArrayUpcoming = [classes.enableupcomingtagDiv];
  } else {
    cssArrayUpcoming = [classes.disableupcomingtagDiv];
  }

  if (clickClosedTag) {
    cssArrayClosed = [classes.enableclosedtagDiv];
  } else {
    cssArrayClosed = [classes.disableclosedtagDiv];
  }
  let tagprompt=null;
  return (
    <div className={classes.mainDiv}>
        <div onClick={allTagClickedHandler} className={cssArrayAll.join(" ")}>
          All
        </div>
      <div
        onClick={ongoingTagClickedHandler}
        className={cssArrayOngoing.join(" ")}
      >
        Ongoing
      </div>
      <div
        onClick={upcomingTagClickedHandler}
        className={cssArrayUpcoming.join(" ")}
      >
        Upcoming
      </div>
      <div
        onClick={closedTagClickedHandler}
        className={cssArrayClosed.join(" ")}
      >
        Closed
      </div>
    </div>
  );
};

export default Tag;
