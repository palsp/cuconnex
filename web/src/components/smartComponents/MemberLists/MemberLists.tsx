import React, { useState } from "react";
import MemberList from "@smartComponents/MemberLists/MemberList/MemberList";
import mockMemberLists from "@src/mockData/mockMemberLists";
import classes from "./MemberLists.module.css";
import { MemberListsData } from "@src/mockData/Models";
interface Props {
  memberlist: MemberListsData[] | [];
  selectMemberListsHandler: (e: number) => void;
}
const MemberLists: React.FC<Props> = (props) => {
  return (
    <div>
      {props.memberlist.map((person:MemberListsData, index:number) => {
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
