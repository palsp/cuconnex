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
  IInviteData,
  IUser,
  IUserFriend,
  IUserFriendExtended,
} from "@src/models";
import {
  fetchFriendsDataAPI,
  fetchRecommendedUser,
  fetchRecommendUserForTeam,
  fetchTeamNotificationAPI,
  fetchTeamOutgoingNotificationAPI,
  fetchUserTeamRequestAPI,
  teamInvitationAPI,
} from "@src/api";
import { number } from "yup/lib/locale";
import MemberListsForPrompt from "@smartComponents/MemberLists/MemberListsForPrompt";

interface Props {
  teams: IFetchTeam;
  backHandler: any;
  incomingRequest: IUserFriend[] | [];
}

const inviteMembersPrompt: React.FC<Props> = (props) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [memberArray, setMemberArray] = useState<number[]>([]);
  const [numberFriends, setNumberFriends] = useState<number>(0);
  const [selectedMemberArray, setSelectedMemberArray] = useState<IUserFriend[]>(
    []
  );
  const [recommendLists, setRecommendLists] = useState<IUser[]>([]);
  const [friendsNotInTeam, setFriendsNotInTeam] = useState<
    IUserFriendExtended[]
  >([]);
  // const [newFriendLists, setNewFriendLists] = useState<IUserFriend[] | []>([]);
  useEffect(() => {
    fetchFriendsHandler();
    fetchRecommendedUserHandler();
  }, []);
  const invitationHandler = async (inviteData: IInviteData) => {
    try {
      const resultInvitation = await teamInvitationAPI(inviteData);
      console.log(
        "Hi, Successfully sent a POST request to /api/teams/invite-member",
        resultInvitation
      );
    } catch (e) {
      console.log("ERRORS occured while POST /api/teams/invite-member", e);
    }
  };
  const inviteMember = () => {
    selectedMemberArray.forEach((members) => {
      invitationHandler({
        teamName: props.teams.name,
        newMemberId: members.id,
      });
      console.log("POST /members/invite/", props.teams.name, members.id);
      setClicked(true);
    });
  };
  const fetchRecommendedUserHandler = async () => {
    try {
      const recommendedUsers = await fetchRecommendUserForTeam(
        props.teams.name
      );
      setRecommendLists(recommendedUsers.data.users);
      console.log("fetchRecommendedUserForTeam", recommendedUsers);
    } catch (e) {
      console.log(e);
    }
  };
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

    const extendedFriendsNotInTeam: IUserFriendExtended[] = extendedFriends.filter(
      (extendedFriend) => {
        let inTeam = false;
        currentMembers.forEach((member) => {
          inTeam = inTeam || member.id === extendedFriend.id;
        });
        return !inTeam;
      }
    );
    setFriendsNotInTeam(extendedFriendsNotInTeam);
  };

  const selectPersonHandler = (e: any) => {
    const positionOfE = selectedMemberArray.indexOf(e);
    if (positionOfE === -1) {
      setSelectedMemberArray([...selectedMemberArray, e]);
    } else {
      const newMemberArray = [...selectedMemberArray];
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
    <>
      <div className={classes.divHeading}>
        <div className={classes.divFixed}>
          <div className={classes.relativeArrow}>
            <Link to="/">
              <ArrowLeft />
            </Link>
          </div>
          <Heading value="Invite Members" size="small-medium" />
          <button className={classes.noStyleButton}>Invite</button>
          <SearchBar value="Search By Name" />
        </div>
      </div>
      <div className={classes.divInfo}>
        <div className={classes.memberListsDiv}>
          <Heading size="smallMedium" value="Connections" />
          <MemberListsForPrompt
            clicked={clicked}
            team={props.teams}
            memberlist={friendsNotInTeam}
            selectMemberListsHandler={selectMemberHandler}
            personHandler={selectPersonHandler}
          />
          <Heading size="smallMedium" value="Recommended Users" />
          <MemberListsForPrompt
            clicked={clicked}
            team={props.teams}
            memberlist={recommendLists}
            selectMemberListsHandler={selectMemberHandler}
            personHandler={selectPersonHandler}
          />
          {console.log("SelectedArray Contain: ", selectedMemberArray)}
          {console.log("AllArray Contain: ", memberArray)}
          {/* <div className={classes.divRight}>
            <Subtitle
              value={`${memberArray.length} member selected`}
              color="black"
              size="smaller"
            />
          </div> */}
        </div>
        <div className={classes.memberListsDiv}>
          <MemberListsForPrompt
            clicked={clicked}
            team={props.teams}
            memberlist={friendsNotInTeam}
            selectMemberListsHandler={selectMemberHandler}
            personHandler={selectPersonHandler}
          />
          {console.log("SelectedArray Contain: ", selectedMemberArray)}
          {console.log("AllArray Contain: ", memberArray)}
        </div>
      </div>
    </>
  );

  return <div>{selectPrompt}</div>;
};

export default inviteMembersPrompt;
