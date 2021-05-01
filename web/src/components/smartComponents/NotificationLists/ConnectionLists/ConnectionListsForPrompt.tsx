import React, { useState } from "react";
import ConnectionList from "@smartComponents/NotificationLists/ConnectionLists/ConnectionList/ConnectionList";
import classes from "./ConnectionLists.module.css";
import { ConnectionListsData } from "@src/mockData/Models";
import mockConnectionLists from "@src/mockData/mockConnectionListsData";
import { IFetchFriendsData, IFetchTeam, IUser, IUserFriend } from "@src/models";
import ConnectionListForPrompt from "./ConnectionList/ConnectionListForPrompt";

interface Props {
  requests: IUserFriend[] | [];
  teams: IFetchTeam;
}

const ConnectionListsForPrompt: React.FC<Props> = (props) => {
  return (
    <div className={classes.ConnectionLists}>
      <div className={classes.listHeader}>
        Member Requests ({props.requests.length})
      </div>
      {props.requests.map((friendNoti: IUserFriend, index: number) => {
        return (
          <div key={index}>
            <ConnectionListForPrompt
              teams={props.teams}
              key={index}
              connection={friendNoti}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ConnectionListsForPrompt;
