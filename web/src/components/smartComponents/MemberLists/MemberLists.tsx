import React, { useState } from "react";
import MemberList from "@smartComponents/MemberLists/MemberList/MemberList";
import mockMemberLists from "./../../../mockData/mockMemberLists";
import classes from "./MemberLists.module.css";
interface Props {
  selectMemberListsHandler: (e: number) => void;
}
const MemberLists: React.FC<Props> = (props) => {
  return (
    <div>
      {mockMemberLists.map((person, index) => {
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
