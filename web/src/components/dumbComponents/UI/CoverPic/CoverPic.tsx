import React from "react";
import classes from "./CoverPic.module.css";

interface Props {
  url: string;
  team?: boolean;
}
const CoverPic: React.FC<Props> = (props) => {
  if (props.team) {
    return <div className={classes.coverPicTeam}></div>;
  } else {
    return <div className={classes.coverPic}></div>;
  }
};

export default CoverPic;
