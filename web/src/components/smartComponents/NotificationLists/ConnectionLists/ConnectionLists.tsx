import React, { useState } from "react";
import ConnectionList from "@smartComponents/NotificationLists/ConnectionLists/ConnectionList/ConnectionList";
import classes from "./ConnectionLists.module.css";
import { ConnectionListsData } from "@src/mockData/Models";
import mockConnectionLists from "@src/mockData/mockConnectionListsData";
import { IFetchFriendsData, IUser, IUserFriend } from "@src/models";

interface Props {
  requests: [IUserFriend] | [];
}

const ConnectionLists: React.FC<Props> = (props) => {
  return (
    <div className={classes.ConnectionLists}>
      <div className={classes.listHeader}>Connections</div>
      {props.requests.map((friendNoti:IUserFriend, index: number) => {
        return (
          <div key={index}>
            <ConnectionList key={index} connection={friendNoti} />
          </div>
        );
      })}
    </div>
  );
};

export default ConnectionLists;
