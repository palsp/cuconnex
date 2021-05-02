import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ConnectionLists,
  FriendLists,
  SearchBar,
} from "@smartComponents/index";
import { Heading } from "@dumbComponents/UI/index";
import { ArrowLeft } from "@icons/index";
import { motion } from "framer-motion";
import containerVariants, {
  IFetchTeam,
  ITeamCreatorResponse,
  IUser,
  IUserFriend,
} from "@src/models/models";

import classes from "./RequestPrompt.module.css";
import {
  fetchFriendsDataAPI,
  fetchTeamIncomingNotificationAPI,
  teamOwnerResponseAPI,
} from "@src/api";
import { UserContext } from "@context/UserContext";
import ConnectionListsForPrompt from "@smartComponents/NotificationLists/ConnectionLists/ConnectionListsForPrompt";
interface Props {
  teams: IFetchTeam;
  requests: IUserFriend[] | [];
}
const RequestPrompt: React.FC<Props> = (props) => {
  const [hasSearch, setHasSearch] = useState<boolean>(false);
  const [friendLists, setFriendLists] = useState<IUserFriend[] | []>([]);
  const ownerResponseHandler = async (response: ITeamCreatorResponse) => {
    const resultTeam = await teamOwnerResponseAPI(response);
    console.log("User Status:", resultTeam);
  };
  let status = "";
  if (props.requests.length == 0) {
    status = "Currently, there is no pending request";
  }
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      data-test="friends-page"
    >
      <div className={classes.divHeading}>
        <div className={classes.listDiv}>
          <ConnectionListsForPrompt
            teams={props.teams}
            requests={props.requests}
          ></ConnectionListsForPrompt>
          <div className={classes.statusDiv}>{status}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default RequestPrompt;
