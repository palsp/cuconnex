import React, { useState } from "react";
import MemberList from "@smartComponents/MemberLists/MemberList/MemberList";
import mockMemberLists from "@src/mockData/mockMemberLists";
import { fetchFriendsDataAPI } from "@api/index";
import classes from "./MemberLists.module.css";

import { UsersData } from "@src/mockData/Models";
import { IUser, IUserFriend } from "@src/models";

interface Props {
  memberlist: IUserFriend[] | [];
  selectMemberListsHandler: (e: number) => void;
  personHandler: (e: IUserFriend) => void;
}
const MemberLists: React.FC<Props> = (props) => {
  // const fetchFriendsList:member[] = async () => {
  //   try {
  //     return await fetchFriendsDataAPI();
  //   } catch(e){

  //   }
  // }
  const selectMemberListHandler = (
    checked: boolean,
    index: number,
    person: UsersData
  ) => {
    if (checked) {
      props.selectMemberListsHandler(index);
      props.personHandler(person);
    }
  };
  return (
    <div>
      {/* New feature-web/nat BUT FAILED!!!!!!!!! PLS fix
      {props.memberlist.map((person: MemberListsData, index: number) => { */}
      {props.memberlist.map((person: IUserFriend, index: number) => {
        return (
          <div key={index}>
            <MemberList
              key={index}
              members={person}
              selectMemberListHandler={(checked: boolean) =>
                selectMemberListHandler(checked, index, person)
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default MemberLists;
