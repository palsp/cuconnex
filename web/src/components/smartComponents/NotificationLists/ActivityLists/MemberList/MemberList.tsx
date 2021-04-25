import React, { useState } from "react";

import {
  Heading,
  Subtitle,
  Username,
  CheckBox,
  RecruitSign,
} from "@dumbComponents/UI/index";
import { ProfilePic } from "@smartComponents/index";

import classes from "./MemberList.module.css";
import { IUser, IUserFriend } from "@src/models";

interface Props {
  member:IUserFriend;
}

const MemberList: React.FC<Props> = (props) => {
  return (
    <div className={classes.memberList} data-test="member-list">
      <div className={classes.leftFlex}>
        <div className={classes.profilePic}>
          <ProfilePic />
        </div>
      </div>
      <div className={classes.rightFlex}>
        <div className={classes.name}>
          <Subtitle
            data-test="member-list-name"
            value={props.member.name}
            size="small-medium"
            color="black"
          />
        </div>
        <div className={classes.role}>
          <Subtitle
            data-test="member-list-role"
            value={props.member.major}
            color="pink"
          />
        </div>
        <div className={classes.smallFlex}>
          <div className={classes.teamName}>{props.member.faculty}</div>

          <div className={classes.connectedSign}>
            <RecruitSign
              data-test="team-list-status"
              value={props.member.connections.status}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberList;
