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

interface Props {
  Connection: {
    profilePic: string;
    name: string;
    role: string;
    faculty: string;
    status: string;
  };
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
            value={props.Connection.name}
            size="small-medium"
            color="black"
          />
        </div>
        <div className={classes.role}>
          <Subtitle
            data-test="connection-list-role"
            value={props.Connection.role}
            size="small"
            color="pink"
          />
        </div>
        <div className={classes.smallFlex}>
          <div className={classes.faculty}>{props.Connection.faculty}</div>

          <div className={classes.connectedSign}>
            <RecruitSign
              data-test="team-list-status"
              value={props.Connection.status}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionList;
