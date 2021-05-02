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
import { Accept, Check, Decline } from "@dumbComponents/UI/Icons";
import { addFriendResponseAPI } from "@src/api";
interface Props {
  connection: IUserFriend;
}
const ConnectionList: React.FC<Props> = (props) => {
  const [clickAccept, setAccept] = useState(false);
  const [clickDecline, setDecline] = useState(false);

  const acceptButtonHandler = async () => {
    setAccept(true);
    setDecline(false);
    const response = {
      userId: props.connection.id + "",
      accepted: true,
    };
    console.log("Accept Connection");
    const friendsReceivedData = await addFriendResponseAPI(response);
    console.log("Responded as ", friendsReceivedData.data);
  };

  const declineButtonHandler = async () => {
    setAccept(false);
    setDecline(true);
    const response = {
      userId: props.connection.id + "",
      accepted: false,
    };
    console.log("Decline Connection");
    const friendsReceivedData = await addFriendResponseAPI(response);
    console.log("Responded as ", friendsReceivedData.data);
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

export default ConnectionList;
