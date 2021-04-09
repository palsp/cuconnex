import React from "react";
import classes from "./CoverPic.module.css";

interface Props {
  url: string;
}
const CoverPic: React.FC<Props> = (props) => {
  return <div className={classes.coverPic}></div>;
};

export default CoverPic;
