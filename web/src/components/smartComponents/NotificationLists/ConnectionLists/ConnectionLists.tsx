import React, { useState } from "react";
import ConnectionList from "@smartComponents/NotificationLists/ConnectionLists/ConnectionList/ConnectionList";
import classes from "./ConnectionLists.module.css";
import { ConnectionListsData } from "@src/mockData/Models";
import mockConnectionLists from "@src/mockData/mockConnectionListsData";

interface Props {
  Connectionlist: ConnectionListsData[] | [];
}

const ConnectionLists: React.FC<Props> = (props) => {
  return (
    <div className={classes.ConnectionLists}>
      <div className={classes.listHeader}>Connections</div>
      {props.Connectionlist.map(
        (Connection: ConnectionListsData, index: number) => {
          return (
            <div key={index}>
              <ConnectionList key={index} Connection={Connection} />
            </div>
          );
        }
      )}
    </div>
  );
};

export default ConnectionLists;
