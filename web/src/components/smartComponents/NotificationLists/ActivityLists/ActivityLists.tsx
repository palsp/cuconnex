import React, { useState } from "react";
import ActivityList from "@smartComponents/NotificationLists/ActivityLists/MemberList/MemberList";
import classes from "./ActivityLists.module.css";
import { MembersInActivityNotificationData } from "@src/mockData/Models";
import mockMembersInActivityNotification from "@src/mockData/mockMembersInActivityNotificationData";
import { PositionsInActivityNotificationData } from "@src/mockData/Models";
import mockPositionsInActivityNotification from "@src/mockData/mockPositionsInActivityNotificationData";
import {
  MemberInActivityNotificationList,
  PositionsInActivityNotificationList,
} from "@smartComponents/index";
import { Heading, Subtitle } from "@dumbComponents/UI";
import { IUser, IUserFriend } from "@src/models";

interface Props {
  Memberlist: IUserFriend[] | [];
  Positionlist: PositionsInActivityNotificationData[] | [];
}

const ActivityNotificationLists: React.FC<Props> = (props) => {
  return (
    <div className={classes.ActivityNotificationLists}>
      <div className={classes.positionlist}>
        <div className={classes.listHeader}>Pending Team</div>
        {props.Positionlist.map(
          (position: PositionsInActivityNotificationData, index: number) => {
            return (
              <div key={index}>
                <PositionsInActivityNotificationList
                  key={index}
                  position={position}
                />
              </div>
            );
          }
        )}
      </div>
      <div className={classes.memberlist}>
        <div className={classes.listHeader}>Pending Connections</div>
        {props.Memberlist.map(
          (person: IUserFriend, index: number) => {
            return (
              <div key={index}>
                <MemberInActivityNotificationList key={index} member={person} />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default ActivityNotificationLists;
