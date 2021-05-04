import React, { useContext, useState } from "react";
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
import { IFetchTeam, IUser, IUserFriend } from "@src/models";
import { UserContext } from "@context/UserContext";
import { Link } from "react-router-dom";

interface Props {
  Memberlist: IUserFriend[] | [];
  requestedTeamList: IFetchTeam[] | [];
}

const ActivityNotificationLists: React.FC<Props> = (props) => {
  const { userData } = useContext(UserContext);
  return (
    <div className={classes.ActivityNotificationLists}>
      <div className={classes.positionlist}>
        <div className={classes.listHeader}>Pending Team</div>
        {props.requestedTeamList.map((position: IFetchTeam, index: number) => {
          return (
            <div className={classes.linkDiv} key={index}>
              <Link
                key={index}
                to={{
                  pathname: "/teamdetail",
                  state: {
                    team: props.requestedTeamList[index],
                  },
                }}
              >
                <PositionsInActivityNotificationList
                  key={index}
                  position={userData.role}
                  teams={position}
                />
              </Link>
            </div>
          );
        })}
      </div>
      <div className={classes.memberlist}>
        <div className={classes.listHeader}>Pending Connections</div>
        {props.Memberlist.map((person: IUserFriend, index: number) => {
          return (
            <div className={classes.linkDiv} key={index}>
              <Link
                key={index}
                to={{
                  pathname: "/profile",
                  state: {
                    users: props.Memberlist[index],
                  },
                }}
              >
                <MemberInActivityNotificationList key={index} member={person} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityNotificationLists;
