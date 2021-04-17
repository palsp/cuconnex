import React, { useState } from "react";
import MemberList from "@smartComponents/MemberLists/MemberList/MemberList";
import mockMemberLists from "@src/mockData/mockMemberLists";
import { fetchFriendsDataAPI } from "@api/index";
import classes from "./MemberLists.module.css";
import { MemberListsData } from "@src/mockData/Models";

interface member {
  name: string;
  profilePic: string;
  interest: string;
  major: string;
  year: number;
}
interface Props {
  memberlist: MemberListsData[] | [];
  selectMemberListsHandler: (e: number) => void;
  // selectMemberListsHandler: (e: member) => void;
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
      {props.memberlist.map((person: MemberListsData, index: number) => {
        return (
          <div key={index}>
            <MemberList
              key={index}
              member={person}
              selectMemberListHandler={(currentState: boolean) => {
                props.selectMemberListsHandler(index);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MemberLists;
