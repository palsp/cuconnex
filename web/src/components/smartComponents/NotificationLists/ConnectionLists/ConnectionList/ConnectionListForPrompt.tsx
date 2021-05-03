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
import { IFetchTeam, IUser, IUserFriend } from "@src/models";
import { Accept, Check, Decline } from "@dumbComponents/UI/Icons";
import { addFriendResponseAPI, teamOwnerResponseAPI } from "@src/api";
interface Props {
  connection: IUserFriend;
  teams: IFetchTeam;
}
const ConnectionListForPrompt: React.FC<Props> = (props) => {
  const [clickAccept, setAccept] = useState(false);
  const [clickDecline, setDecline] = useState(false);

  const acceptButtonHandler = async () => {
    setAccept(true);
    setDecline(false);
    const response = {
      targetUserId: props.connection.id,
      teamName: props.teams.name,
      status: "Accept",
    };
    console.log("Accept Request");
    const resultTeam = await teamOwnerResponseAPI(response);
    console.log("User Status:", resultTeam);
  };

  const declineButtonHandler = async () => {
    setAccept(false);
    setDecline(true);
    const response = {
      targetUserId: props.connection.id,
      teamName: props.teams.name,
      status: "Reject",
    };
    console.log("Reject Request");
    const resultTeam = await teamOwnerResponseAPI(response);
    console.log("User Status:", resultTeam);
  };

  let ButtonPrompt = null;
  if (!clickAccept && !clickDecline) {
    ButtonPrompt = (
      <div className={classes.selectSign}>
        <div className={classes.acceptIcon} onClick={acceptButtonHandler}>
          <Accept />
        </div>
        <div className={classes.declineIcon} onClick={declineButtonHandler}>
          <Decline />
        </div>
      </div>
    );
  } else if (clickAccept) {
    ButtonPrompt = (
      <div className={classes.connectedSign}>
        <RecruitSign data-test="team-list-status" value="Connected" />
      </div>
    );
  } else if (clickDecline) {
    ButtonPrompt = (
      <div className={classes.declineSign}>
        <RecruitSign data-test="team-list-status" value="Declined" />
      </div>
    );
  }

  return (
    <div className={classes.connectionList} data-test="connection-list">
      <div className={classes.leftFlex}>
        <div className={classes.profilePic}>
          <ProfilePic />
        </div>
      </div>
      <div className={classes.midFlex}>
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
            value={props.connection.role}
            size="small"
            color="pink"
          />
        </div>
        <div className={classes.smallFlex}>
          <div className={classes.faculty}>{props.connection.faculty}</div>
        </div>
      </div>
      <div className={classes.rightFlex}>{ButtonPrompt}</div>
    </div>
  );
};

export default ConnectionListForPrompt;
