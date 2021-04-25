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
import { Check } from "@dumbComponents/UI/Icons";
interface Props {
  connection: IUserFriend;
}
const ConnectionList: React.FC<Props> = (props) => {
  const [clickAccept, setAccept] = useState(false);
  const [clickDecline, setDecline] = useState(false);

  const acceptButtonHandler = () => {
    setAccept(true);
    setDecline(false);
    console.log("Accept Connection");
  };

  const declineButtonHandler = () => {
    setAccept(false);
    setDecline(true);
    console.log("Decline Connection");
  };

  let ButtonPrompt = null;
  if (!clickAccept && !clickDecline) {
    ButtonPrompt = (
      <div className={classes.selectSign}>
        <div className={classes.acceptIcon} onClick={acceptButtonHandler}>
          <Check circle={true}/>
        </div>
        <div className={classes.declineIcon} onClick={declineButtonHandler}>
          <Check circle={true}/>
        </div>
      </div>
    );
  } else if (clickAccept) {
    ButtonPrompt = (
      <div 
        className={classes.connectedSign}
        
        >
          <RecruitSign
            data-test="team-list-status"
            value="Connected"
          />
    </div>
    );   
  } else if (clickDecline) {
    ButtonPrompt = (
      <div className={classes.declineSign}
      >
      <RecruitSign
        data-test="team-list-status"
        value="Declined"
      />
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
            value={props.connection.major}
            size="small"
            color="pink"
          />
        </div>
        <div className={classes.smallFlex}>
          <div className={classes.faculty}>{props.connection.faculty}</div>
        </div>
      </div>
      <div className={classes.rightFlex}>
          {ButtonPrompt}
      </div>
    </div>
  );
};

export default ConnectionList;
