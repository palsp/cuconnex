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
import { IFetchTeam, ITeam } from "@src/models";

interface Props {
  teams: IFetchTeam;
  position: string;
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
            value={props.position}
            size="small-medium"
            color="pink"
          />
        </div>
        <div className={classes.teamName}>{props.teams.name}</div>
        <div className={classes.smallFlex}>
          <div className={classes.memberPic}>
            <ProfilePic PicUrl={props.teams.members[0].image} size="m" />
          </div>
          <div className={classes.more}>+{props.teams.members.length - 1}</div>
          <div className={classes.pendingSign}>
            <RecruitSign data-test="position-list-status" value={"Pending"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionList;
