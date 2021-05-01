import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { MemberLists, SearchBar } from "@smartComponents/index";
import { Heading, Subtitle } from "@dumbComponents/UI/index";
import { ArrowLeft } from "@icons/index";
import classes from "./InviteMembersPrompt.module.css";
import { motion } from "framer-motion";
import { UsersData } from "@src/mockData/Models";
import {
  IEventData,
  IFetchTeam,
  IUser,
  IUserFriend,
  IUserFriendExtended,
} from "@src/models";
import {
  fetchFriendsDataAPI,
  fetchTeamNotificationAPI,
  fetchTeamOutgoingNotificationAPI,
  fetchUserTeamRequestAPI,
} from "@src/api";
import { number } from "yup/lib/locale";
import MemberListsForPrompt from "@smartComponents/MemberLists/MemberListsForPrompt";

interface Props {
  teams: IFetchTeam;
  backHandler: any;
  incomingRequest: IUserFriend[] | [];
}

const inviteMembersPrompt: React.FC<Props> = (props) => {
  const [memberArray, setMemberArray] = useState<number[]>([]);
  const [numberFriends, setNumberFriends] = useState<number>(0);
  const [selectedMemberArray, setSelectedMemberArray] = useState<IUserFriend[]>(
    []
  );
  const [friendsNotInTeam, setFriendsNotInTeam] = useState<
    IUserFriendExtended[]
  >([]);
  // const [newFriendLists, setNewFriendLists] = useState<IUserFriend[] | []>([]);
  useEffect(() => {
    fetchFriendsHandler();
  }, []);

  const fetchFriendsHandler = async () => {
    const friendsData = await fetchFriendsDataAPI();
    console.log("SUCCESS fetchFriendsHandler", friendsData.data.connections);

    const invitedData = await fetchTeamOutgoingNotificationAPI(
      props.teams.name
    );
    console.log(
      "SUCCESS Outgoing team request =",
      invitedData.data.outgoingRequests.pendingUsers
    );

    const friends = friendsData.data.connections;
    const invitedFriends = invitedData.data.outgoingRequests.pendingUsers;
    const currentMembers = props.teams.members;
    const requestedFriends = props.incomingRequest;

    const extendedFriends: IUserFriendExtended[] = friends.map((friend) => {
      const extendedFriend = friend as IUserFriendExtended;
      invitedFriends.forEach((invitedFriend) => {
        if (friend.id === invitedFriend.id) {
          extendedFriend.status = "invited";
        }
      });
      requestedFriends.forEach((requestedFriend) => {
        if (friend.id === requestedFriend.id) {
          extendedFriend.status = "requestedToJoin";
        }
      });

      if (!extendedFriend.status) {
        extendedFriend.status = "notInvited";
      }

      let inTeam = false;
      currentMembers.forEach((member) => {
        inTeam = inTeam || member.id === extendedFriend.id;
      });

      if (inTeam) {
        extendedFriend.status = "inTeam";
      }

      return extendedFriend;
    });

    setFriendsNotInTeam(extendedFriends);
  };

  const selectPersonHandler = (e: IUserFriend) => {
    const positionOfE = selectedMemberArray.indexOf(e);
    if (positionOfE === -1) {
      setSelectedMemberArray([...selectedMemberArray, e]);
    } else {
      const newMemberArray: IUserFriend[] | [] = [...selectedMemberArray];
      newMemberArray.splice(positionOfE, 1);
      // setSelectedMemberArray(
      //   (selectedMemberArray) => (selectedMemberArray = newMemberArray)
      // );
      setSelectedMemberArray(newMemberArray); // Mon: The above code I commented out is ngong mak. I think you can't reassign previous state.
    }
  };
  const selectMemberHandler = (e: number) => {
    const positionOfE = memberArray.indexOf(e);
    if (positionOfE === -1) {
      setMemberArray([...memberArray, e]);
    } else {
      const newMemberArray = [...memberArray];
      newMemberArray.splice(positionOfE, 1);
      // setMemberArray((memberArray) => (memberArray = newMemberArray));
      setMemberArray(newMemberArray); // Mon: The above code I commented out is ngong mak. I think you can't reassign previous state.
    }
  };

  const selectPrompt = (
    <div>
      <div className={classes.divHeading}>
        <div className={classes.divFixed}>
          <Heading value="Invite Members" size="small-medium" />
          <div className={classes.noStyleButton}>Invite</div>
          {/* <div onClick={() => props.backHandler()} className={classes.arrowDiv}>
            <ArrowLeft />
          </div> */}
          <div className={classes.arrowDiv} onClick={props.backHandler()}>
            <ArrowLeft></ArrowLeft>
          </div>
          <div className={classes.searchDiv}>
            <SearchBar value="Search By Name" />
          </div>
        </div>
        <div className={classes.divInfo}>
          <div className={classes.divLeft}>
            {/* <p>My Connection</p> */}
            <Subtitle value="My connection" color="black" size="small-medium" />
          </div>
          <div className={classes.divRight}>
            <Subtitle
              value={`${memberArray.length} member selected`}
              color="black"
              size="smaller"
            />
          </div>
        </div>
        <div className={classes.memberListsDiv}>
          <MemberListsForPrompt
            memberlist={friendsNotInTeam}
            selectMemberListsHandler={selectMemberHandler}
            personHandler={selectPersonHandler}
          />
          {console.log("SelectedArray Contain: ", selectedMemberArray)}
          {console.log("AllArray Contain: ", memberArray)}
        </div>
      </div>
    </div>
  );
  return <div>{selectPrompt}</div>;
};

export default inviteMembersPrompt;
