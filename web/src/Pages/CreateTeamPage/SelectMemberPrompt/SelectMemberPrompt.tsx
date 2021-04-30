import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { MemberLists, SearchBar } from "@smartComponents/index";
import { Heading, Subtitle } from "@dumbComponents/UI/index";
import { ArrowLeft } from "@icons/index";
import classes from "./SelectMemberPrompt.module.css";
import CreateTeamPrompt from "../CreateTeamPrompt/CreateTeamPrompt";
import CreateTeamPage from "../CreateTeamPage";
import { motion } from "framer-motion";
import { UsersData } from "@src/mockData/Models";
import { IEventData, IUser, IUserFriend } from "@src/models";
import { fetchFriendsDataAPI } from "@src/api";
import SelectEventPrompt from "../SelectEventPrompt/SelectEventPrompt";

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
  useEffect(() => {
    fetchFriendsHandler().then((value: IUserFriend[] | []) =>
      setFriendLists(value)
    );
  }, []);
  const fetchFriendsHandler = async () => {
    const friendsData = await fetchFriendsDataAPI();
    console.log("SUCCESS fetchFriendsHandler", friendsData.data);
    return friendsData.data.connections;
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
  const selectPrompt =
    clickSelectMember === true ? (
      <div>
        <div className={classes.divHeading}>
          <div className={classes.divFixed}>
            <div className={classes.relativeArrow}>
              <Redirect to="/createteam">
                <ArrowLeft />
              </Redirect>
            </div>
            <Heading value="Select Members" size="small-medium" />
            <button
              onClick={inviteClickedHandler}
              className={classes.noStyleButton}
            >
              Invite
            </button>
            <div onClick={backClickedHandler} className={classes.arrowDiv}>
              <ArrowLeft />
            </div>
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
          <MemberLists
            memberlist={friendLists}
            selectMemberListsHandler={selectMemberHandler}
            personHandler={selectPersonHandler}
          />
          {console.log("Array Contain: ", selectedMemberArray)}
          {console.log("Array Contain: ", memberArray)}
        </div>
      </div>
    ) : clickCreateTeam === true ? (
      <CreateTeamPrompt members={selectedMemberArray} />
    ) : (
      <div>
        <SelectEventPrompt />
      </div>
    );

  return <div>{selectPrompt}</div>;
};

export default SelectMemberPrompt;
