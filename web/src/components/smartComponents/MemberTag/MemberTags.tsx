import { MemberTagData, SelectedMemberLists } from "@src/mockData/Models";
import React, { useState } from "react";
import classes from "./MemberTags.module.css";
import MemberTag from "./MemberTag/MemberTag";
interface Props {
  members:
   MemberTagData[] | []
}

const MemberTags: React.FC<Props> = (props) => {
  const member = props.members.length;
  const mappedMembers=(
    <div className={classes.memberTagDiv} >
      {props.members.map((person:MemberTagData, index:number) => {
        return (
          <div 
          className={classes.individualTagDiv}
          key={index}>
            <MemberTag
              key={index}
              members={person}
            />
          </div>
        );
      })}
    </div>
  );
  return (
    <div>
      <div className={classes.headerDiv}>Members ({member})</div>
      <div>{mappedMembers}</div>
    </div>
  );
};

export default MemberTags;
