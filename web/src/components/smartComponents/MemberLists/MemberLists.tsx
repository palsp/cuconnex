import React, { useState } from "react";
import MemberList from "@smartComponents/MemberLists/MemberList/MemberList";
import mockMemberLists from "@src/mockData/mockMemberLists";
import classes from "./MemberLists.module.css";
import { UsersData } from "@src/mockData/Models";
interface Props {
  memberlist: UsersData[] | [];
  selectMemberListsHandler: (e: number) => void;
  personHandler: (e:UsersData) =>void;
}
const MemberLists: React.FC<Props> = (props) => {
  return (
    <div>
      {props.memberlist.map((person:UsersData, index:number) => {
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
