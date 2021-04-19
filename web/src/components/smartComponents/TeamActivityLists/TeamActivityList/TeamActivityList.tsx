import React from "react";
import classes from "./TeamActivityList.module.css";
import { Logo, RecruitSign } from "@dumbComponents/UI";

interface Props {
  teamActivityBox: {
    teamActivityPic: any;
    name: string;
    event: string;
    status: string;
  };
}

const TeamActivityList: React.FC<Props> = (props) => {
  return (
    <div data-test="TeamActivity-list" className={classes.teamActivityList}>
      <div className={classes.teamActivityContainer}>
        <div className={classes.teamActivityLogo}>
          <Logo />
        </div>
        <div className={classes.teamActivityInfo}>
          <div className={classes.name}>{props.teamActivityBox.name}</div>
          <div className={classes.role}>{props.teamActivityBox.event}</div>
          <div className={classes.status}>
            <RecruitSign value={props.teamActivityBox.status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamActivityList;
