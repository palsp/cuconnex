import ProfilePic from "@smartComponents/ProfilePic/ProfilePic";
import React from "react";
import classes from "./MemberPicList.module.css";

const memberpicArray = [
  {
    memberpic: "",
    name: "Sasin Business Case",
  },
  {
    memberpic: "",
    name: "CUCONNEX",
  },
  {
    memberpic: "",
    name: "Sasin Business Case",
  },
  {
    memberpic: "",
    name: "CUCONNEX",
  },
];

const MemberPicList: React.FC = () => {
  return (
    <div data-test="member-pic-list">
      <div className={classes.heading}>Members</div>
      <div className={classes.subheading}>
        2 members from faculty of engineering
      </div>
      <div className={classes.piclist}>
        <ProfilePic size="mini" />
        <ProfilePic size="mini" />
        <ProfilePic size="mini" />
        <ProfilePic size="mini" />
        <ProfilePic size="mini" />
        <div className={classes.more}>5+</div>
      </div>
    </div>
  );
};

export default MemberPicList;
