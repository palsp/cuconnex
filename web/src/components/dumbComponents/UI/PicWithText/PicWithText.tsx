import React from "react";
import classes from "./PicWithText.module.css";

interface Props {
  value: string;
}
const PicWithText: React.FC<Props> = (props) => {
  return <div className={classes.pic}>{props.value}</div>;
};

export default PicWithText;
