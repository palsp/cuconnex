import React from "react";
import classes from "./ActivityList.module.css";
import { Logo, RecruitSign } from "@dumbComponents/UI";

interface Props {
  activityBox: {
    activityPic: any;
    name: string;
    role: string;
    status: string;
  };
}

const ActivityList: React.FC<Props> = (props) => {
  return (
    <div data-test="activity-list" className={classes.activityList}>
      <div className={classes.activityContainer}>
        <div className={classes.activityLogo}>
          <Logo />
        </div>
        <div className={classes.activityInfo}>
          <div className={classes.name}>{props.activityBox.name}</div>
          <div className={classes.role}>{props.activityBox.role}</div>
          <div className={classes.status}>
            <RecruitSign value={props.activityBox.status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityList;
