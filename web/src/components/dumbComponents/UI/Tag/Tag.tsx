import React, { useState } from "react";
import classes from "./Tag.module.css";

enum tagTypes {
  all = "all",
  onGoing = "onGoing",
  upComing = "upComing",
  closed = "closed",
}

const Tag: React.FC = () => {
  const [tag, setTag] = useState<tagTypes>(tagTypes.all);
  const allTagClickedHandler = () => {
    setTag(tagTypes.all);
  };
  const ongoingTagClickedHandler = () => {
    setTag(tagTypes.onGoing);
  };
  const upcomingTagClickedHandler = () => {
    setTag(tagTypes.upComing);
  };
  const closedTagClickedHandler = () => {
    setTag(tagTypes.closed);
  };
  const cssArrayAll = [classes.baseTag];
  const cssArrayOngoing = [classes.baseTag];
  const cssArrayUpcoming = [classes.baseTag];
  const cssArrayClosed = [classes.baseTag];
  if (tag === tagTypes.all) {
    cssArrayAll.push(classes.enablealltagDiv);
  } else {
    cssArrayAll.push(classes.disablealltagDiv);
  }
  if (tag === tagTypes.onGoing) {
    cssArrayOngoing.push(classes.enableongoingtagDiv);
  } else {
    cssArrayOngoing.push(classes.disableongoingtagDiv);
  }
  if (tag === tagTypes.upComing) {
    cssArrayUpcoming.push(classes.enableupcomingtagDiv);
  } else {
    cssArrayUpcoming.push(classes.disableupcomingtagDiv);
  }

  if (tag === tagTypes.closed) {
    cssArrayClosed.push(classes.enableclosedtagDiv);
  } else {
    cssArrayClosed.push(classes.disableclosedtagDiv);
  }
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
