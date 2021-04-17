import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Heading, Tab } from "@dumbComponents/UI/index";

import { ArrowLeft } from "@icons/index";

import classes from "./NotificationPage.module.css";
import {
  ActivityNotificationLists,
  ConnectionLists,
} from "@smartComponents/index";

import mockConnectionListsData from "@src/mockData/mockConnectionListsData";
import mockMembersInActivityNotification from "@src/mockData/mockMembersInActivityNotificationData";
import mockPositionsInActivityNotification from "@src/mockData/mockPositionsInActivityNotificationData";

const NotificationPage: React.FC = () => {
  const [clickConnection, setConnection] = useState(true);
  const [clickActivity, setActivity] = useState(false);

  const connectionButtonHandler = () => {
    setConnection(true);
    setActivity(false);
    console.log("setConnection");
  };

  const activityButtonHandler = () => {
    setConnection(false);
    setActivity(true);
    console.log("setActivity");
  };

  let NotificationsPrompt = null;
  if (clickConnection === true) {
    NotificationsPrompt = (
      <div className={classes.tabConnection}>
        <div className={classes.relativeArrow}>
          <Link data-test="Notification-page-back-link" to="/landing">
            <ArrowLeft data-test="Notification-page-arrow-left" />
          </Link>
        </div>
        <div className={classes.head}>
          <Heading data-test="Notification-page-header" value="Notification" />
        </div>
        <div className={classes.tab}>
          <div className={classes.connection}>
            <Tab
              data-test="Notification-page-Connection"
              onClick={connectionButtonHandler}
              value="Connection"
              number="3"
            />
          </div>
          <div className={classes.activity}>
            <Tab
              data-test="Notification-page-Connection"
              onClick={activityButtonHandler}
              value="Activity"
              number="2"
            />
          </div>
        </div>
        <div className={classes.connectionList}>
          <ConnectionLists
            data-test="Notification-page-team-lists"
            Connectionlist={mockConnectionListsData}
          />
        </div>
      </div>
    );
  } else if (clickActivity === true) {
    NotificationsPrompt = (
      <div className={classes.tabActivity}>
        <div className={classes.relativeArrow}>
          <Link data-test="Notification-page-back-link" to="/landing">
            <ArrowLeft data-test="Notification-page-arrow-left" />
          </Link>
        </div>
        <div className={classes.head}>
          <Heading data-test="Notification-page-header" value="Notification" />
        </div>
        <div className={classes.tab}>
          <div className={classes.connection}>
            <Tab
              data-test="Notification-page-Connection"
              onClick={connectionButtonHandler}
              value="Connection"
              number="3"
            />
          </div>
          <div className={classes.activity}>
            <Tab
              data-test="Notification-page-Connection"
              onClick={activityButtonHandler}
              value="Activity"
              number="2"
            />
          </div>
        </div>
        <div className={classes.activityList}>
          <ActivityNotificationLists
            data-test="Notification-page-team-lists"
            Memberlist={mockMembersInActivityNotification}
            Positionlist={mockPositionsInActivityNotification}
          />
        </div>
      </div>
    );
  }

  return (
    <div data-test="Notification-page" className={classes.main}>
      {NotificationsPrompt}
    </div>
  );
};

export default NotificationPage;
