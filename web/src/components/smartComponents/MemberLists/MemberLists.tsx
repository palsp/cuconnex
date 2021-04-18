import React, { useState } from "react";
import MemberList from "@smartComponents/MemberLists/MemberList/MemberList";
import mockMemberLists from "@src/mockData/mockMemberLists";
import { fetchFriendsDataAPI } from "@api/index";
import classes from "./MemberLists.module.css";

import { UsersData } from "@src/mockData/Models";

interface Props {
  memberlist: UsersData[] | [];
  selectMemberListsHandler: (e: number) => void;
  personHandler: (e:UsersData) =>void;

}
const MemberLists: React.FC<Props> = (props) => {
  // const fetchFriendsList:member[] = async () => {
  //   try {
  //     return await fetchFriendsDataAPI();
  //   } catch(e){

  //   }
  // }
  return (
    <div>
// New feature-web/nat
      {props.memberlist.map((person: MemberListsData, index: number) => {

  // Old feature-web    {props.memberlist.map((person:UsersData, index:number) => {

        return (
          <div key={index}>
            <MemberList
              key={index}
              members={person}
              selectMemberListHandler={(currentState: boolean) => {
                props.selectMemberListsHandler(index);
                props.personHandler(person);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MemberLists;
