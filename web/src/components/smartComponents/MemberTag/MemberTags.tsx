import { SelectedMemberLists } from "@src/mockData/Models";
import React, { useState } from "react";
import classes from "./MemberTags.module.css";
import MemberTag from "./MemberTag/MemberTag";
const samplemember: SelectedMemberLists[] = [
  {
    name: "NAT",
    profilePic:"NAT",
    role:"developer",
    selected:true,
  },
  {
    name: "LOONG",
    profilePic:"LOONG",
    role:"developer",
    selected:true,
  },  {
    name: "PAL",
    profilePic:"PAL",
    role:"developer",
    selected:true,
  },  {
    name: "MON",
    profilePic:"MON",
    role:"manager",
    selected:true,
  },
  {
    name: "MONz",
    profilePic:"MON",
    role:"manager",
    selected:true,
  },
  {
    name: "MONzz",
    profilePic:"MON",
    role:"manager",
    selected:true,
  },
];

const MemberTags: React.FC = () => {
  return (
    <div className={classes.memberTagDiv} >
      {samplemember.map((person, index) => {
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
};

export default MemberTags;
