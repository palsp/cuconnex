import { Edit } from "@dumbComponents/UI/Icons";
import React from "react";
import classes from "./Biography.module.css";

interface Props {
  nickname: string;
  detail: string;
}

const Biography: React.FC<Props> = (props) => {
  return (
    <div data-test="biography-test" className={classes.biographyContainer}>
      <div className={classes.heading}>
        <div className={classes.about}>About {props.nickname}</div>
      </div>
      <div className={classes.detail}>{props.detail}</div>
    </div>
  );
};

export default Biography;
