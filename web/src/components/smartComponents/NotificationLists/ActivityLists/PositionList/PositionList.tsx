import React from "react";

import {
  Heading,
  Subtitle,
  Username,
  CheckBox,
  RecruitSign,
} from "@dumbComponents/UI/index";
import { ProfilePic } from "@smartComponents/index";
import classes from "./PositionList.module.css";

interface Props {
  position: {
    teamPic: string;
    role: string;
    teamName: string;
    teamList: string;
    status: string;
  };
}

const PositionList: React.FC<Props> = (props) => {
  return (
    <div className={classes.positionList} data-test="position-list">
      <div className={classes.leftFlex}>
        <div className={classes.profilePic}>
          <ProfilePic />
        </div>
      </div>
      <div className={classes.rightFlex}>
        <div className={classes.role}>
          <Subtitle
            data-test="position-list-role"
            value={props.position.role}
            size="small-medium"
            color="pink"
          />
        </div>
        <div className={classes.teamName}>{props.position.teamName}</div>
        <div className={classes.smallFlex}>
          <div className={classes.memberPic}>
            <ProfilePic size="small" />
            <ProfilePic size="small" />
          </div>
          <div className={classes.more}>7+</div>
          <div className={classes.pendingSign}>
            <RecruitSign
              data-test="position-list-status"
              value={props.position.status}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionList;
