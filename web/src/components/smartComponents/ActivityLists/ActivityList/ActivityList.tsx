import React from "react";
import classes from "./ActivityList.module.css";
import { ActivityListsData } from "@src/mockData/Models";
import { Logo, RecruitSign, ActivityPic } from "@dumbComponents/UI/index";
// import { ProfilePic } from "@smartComponents/index";

interface Props {
  activityBox: ActivityListsData;
}

const ActivityList: React.FC<Props> = (props) => {
  console.log(`Image at ActivityList ${props.activityBox.activityPic}`);
  return (
    <div data-test="activity-list" className={classes.activityList}>
      <div className={classes.activityContainer}>
        <div className={classes.activityLogo}>
          <ActivityPic PicUrl={props.activityBox.activityPic} />
          {/* <Logo /> */}
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
