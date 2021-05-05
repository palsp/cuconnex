import React, { SyntheticEvent } from "react";
import classes from "./ActivityPic.module.css";
import tempFacultyPic from "@assets/tempFacultyPic.jpg";

interface Props {
  PicUrl?: string;
}

const ActivityPic: React.FC<Props> = (props) => {
  let activityCSS;
  activityCSS = [classes.defaultPic];
  if (props.PicUrl) {
    activityCSS = [classes.activityPic];
  }
  // const url = "https://www.cu-connex.com/api/users/" + props.PicUrl;
  const url = props.PicUrl;

  const imageErrorHandler = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = tempFacultyPic;
  };
  return (
    <div className={classes.container}>
      <div className={activityCSS.join(" ")}>
        {props.PicUrl ? (
          <img
            src={url}
            className={classes.activityPic}
            onError={imageErrorHandler}
            alt="activityPic"
          />
        ) : (
          <div className={classes.defaultPic}></div>
        )}
      </div>
      {/* <div className={classes.triangle}></div> */}
    </div>
  );
};

export default ActivityPic;
