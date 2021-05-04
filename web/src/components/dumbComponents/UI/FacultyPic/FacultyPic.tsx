import React, { SyntheticEvent } from "react";
import classes from "./FacultyPic.module.css";
import tempFacultyPic from "@assets/tempFacultyPic.jpg";

interface Props {
  PicUrl?: string;
}

const FacultyPic: React.FC<Props> = (props) => {
  let facultyCSS;
  facultyCSS = [classes.defaultPic];
  if (props.PicUrl) {
    facultyCSS = [classes.facultyPic];
  }
  const url = "https://www.cu-connex.com/api/users/" + props.PicUrl;

  const imageErrorHandler = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = tempFacultyPic;
  };
  return (
    <div className={classes.container}>
      <div className={facultyCSS.join(" ")}>
        {props.PicUrl ? (
          <img
            src={url}
            className={classes.facultyPic}
            onError={imageErrorHandler}
            alt="facultyPic"
          />
        ) : (
          <div className={classes.defaultPic}></div>
        )}
      </div>
      {/* <div className={classes.triangle}></div> */}
    </div>
  );
};

export default FacultyPic;
