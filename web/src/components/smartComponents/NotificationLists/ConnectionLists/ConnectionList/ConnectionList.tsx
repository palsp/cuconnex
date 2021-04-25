import React, { useState } from "react";

import {
  Heading,
  Subtitle,
  Username,
  CheckBox,
  RecruitSign,
} from "@dumbComponents/UI/index";
import { ProfilePic } from "@smartComponents/index";
import classes from "./ConnectionList.module.css";
import { IUser, IUserFriend } from "@src/models";

interface Props {
  connection: IUserFriend;
}

const ConnectionList: React.FC<Props> = (props) => {
  return (
    <div className={classes.connectionList} data-test="connection-list">
      <div className={classes.leftFlex}>
        <div className={classes.profilePic}>
          <ProfilePic />
        </div>
      </div>
      <div className={classes.rightFlex}>
        <div className={classes.name}>
          <Subtitle
            data-test="connection-list-name"
            value={props.connection.name}
            size="small-medium"
            color="black"
          />
        </div>
        <div className={classes.role}>
          <Subtitle
            data-test="connection-list-role"
            value={props.connection.major}
            size="small"
            color="pink"
          />
        </div>
        <div className={classes.smallFlex}>
          <div className={classes.faculty}>{props.connection.faculty}</div>

          <div className={classes.connectedSign}>
            <RecruitSign
              data-test="team-list-status"
              value={props.connection.connections.status}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionList;
