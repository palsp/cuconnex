import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MemberLists, SearchBar } from "@smartComponents/index";
import { Heading, Subtitle } from "@dumbComponents/UI/index";
import { ArrowLeft } from "@icons/index";
import classes from "./SelectMemberPrompt.module.css";
import CreateTeamPrompt from "../CreateTeamPrompt/CreateTeamPrompt";
import CreateTeamPage from "../CreateTeamPage";
import { motion } from "framer-motion";
import { UsersData } from "@src/mockData/Models";
import { IEventData, IUser, IUserFriend } from "@src/models";
import { fetchFriendsDataAPI, fetchRecommendedUser } from "@src/api";
import SelectEventPrompt from "../SelectEventPrompt/SelectEventPrompt";
import PageTitle from "@dumbComponents/UI/PageTitle/PageTitle";

interface Props {
  event?: IEventData;
}
const SelectMemberPrompt: React.FC<Props> = (props) => {
  const [clickSelectMember, setClickSelectMember] = useState<boolean>(true);
  const [clickCreateTeam, setClickCreateTeam] = useState<boolean>(false);
  const [clickSelectEvent, setClickSelectEvent] = useState<boolean>(false);
  const [memberArray, setMemberArray] = useState<number[]>([]);
  const [selectedMemberArray, setSelectedMemberArray] = useState<IUserFriend[]>(
    []
  );
  const [friendLists, setFriendLists] = useState<IUserFriend[] | []>([]);
  const [recommendLists, setRecommendLists] = useState<IUser[]>([]);
  useEffect(() => {
    fetchFriendsHandler();

    fetchRecommendedUserHandler();
  }, []);
  const fetchRecommendedUserHandler = async () => {
    try {
      const recommendedUsers = await fetchRecommendedUser();
      setRecommendLists(recommendedUsers.data.users);
      console.log("fetchRecommendedUser", recommendedUsers);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchFriendsHandler = async () => {
    try {
      const friendsData = await fetchFriendsDataAPI();
      console.log("SUCCESS fetchFriendsHandler", friendsData.data);
      setFriendLists(friendsData.data.connections);
    } catch (e) {
      console.log(e);
    }
  };

  const inviteClickedHandler = () => {
    setClickSelectMember(false);
    setClickCreateTeam(true);
    setClickSelectEvent(false);
  };
  const backClickedHandler = () => {
    setClickSelectEvent(true);
    setClickSelectMember(false);
    setClickCreateTeam(false);
  };
  const selectPersonHandler = (e: any) => {
    const positionOfE = selectedMemberArray.indexOf(e);
    if (positionOfE === -1) {
      setSelectedMemberArray([...selectedMemberArray, e]);
    } else {
      const newMemberArray: IUserFriend[] | [] = [...selectedMemberArray];
      newMemberArray.splice(positionOfE, 1);
      setSelectedMemberArray(
        (selectedMemberArray) => (selectedMemberArray = newMemberArray)
      );
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
      setMemberArray((memberArray) => (memberArray = newMemberArray));
      setMemberArray(newMemberArray); // Mon: The above code I commented out is ngong mak. I think you can't reassign previous state.
    }
  };

  const selectPrompt =
    clickSelectMember === true ? (
      <div>
        <div className={classes.divHeading}>
          <div className={classes.divFixed}>
            <PageTitle
              text="Select Members"
              size="small-medium"
              goBack={backClickedHandler}
            />
            <button
              onClick={inviteClickedHandler}
              className={classes.noStyleButton}
            >
              Invite
            </button>
            <div className={classes.searchDiv}>
              <SearchBar value="Search By Name" />
            </div>
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
          <Heading size="smallMedium" value="Connections" />
          <MemberLists
            memberlist={friendLists}
            selectMemberListsHandler={selectMemberHandler}
            personHandler={selectPersonHandler}
          />
          <Heading size="smallMedium" value="Recommended Users" />

          <MemberLists
            memberlist={recommendLists}
            selectMemberListsHandler={selectMemberHandler}
            personHandler={selectPersonHandler}
          />

          {console.log("Array Contain: ", selectedMemberArray)}
          {console.log("Array Contain: ", memberArray)}
        </div>
      </div>
    ) : clickCreateTeam === true ? (
      <CreateTeamPrompt event={props.event} members={selectedMemberArray} />
    ) : (
      <div>
        <SelectEventPrompt />
      </div>
    );

  return <div>{selectPrompt}</div>;
};

export default SelectMemberPrompt;
