import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { MemberLists, SearchBar } from "@smartComponents/index";
import { Heading, Subtitle } from "@dumbComponents/UI/index";
import { ArrowLeft } from "@icons/index";

import classes from "./SelectMemberPrompt.module.css";
import { mockMemberLists } from "@src/mockData";
import CreateTeamPrompt from "../CreateTeamPrompt/CreateTeamPrompt";
import CreateTeamPage from "../CreateTeamPage";
import { motion } from "framer-motion";
import { UsersData } from "@src/mockData/Models";
import { IUser } from "@src/models";
interface Props {
  members: IUser[];
}
const SelectMemberPrompt: React.FC<Props> = (props) => {
  const [clickSelectMember, setClickSelectMember] = useState<boolean>(true);
  const [clickCreateTeam, setClickCreateTeam] = useState<boolean>(false);
  const [clickSelectScope, setClickSelectScope] = useState<boolean>(false);
  const [memberArray, setMemberArray] = useState<number[]>([]);
  const [selectedMemberArray, setSelectedMemberArray] = useState<IUser[]>(
    []
  );
  const inviteClickedHandler = () => {
    setClickSelectMember(false);
    setClickCreateTeam(true);
    setClickSelectScope(false);
  };
  const backClickedHandler = () => {
    setClickSelectScope(true);
    setClickSelectMember(false);
    setClickCreateTeam(false);
  };
  const selectPersonHandler = (e: IUser) => {
    const positionOfE = selectedMemberArray.indexOf(e);
    if (positionOfE === -1) {
      setSelectedMemberArray([...selectedMemberArray, e]);
    } else {
      const newMemberArray: IUser[] | [] = [...selectedMemberArray];
      newMemberArray.splice(positionOfE, 1);
      setSelectedMemberArray(
        (selectedMemberArray) => (selectedMemberArray = newMemberArray)
      );
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
            memberlist={props.members}
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
        <CreateTeamPage member={props.members} />
      </div>
    );

  return <div>{selectPrompt}</div>;
};

export default SelectMemberPrompt;
