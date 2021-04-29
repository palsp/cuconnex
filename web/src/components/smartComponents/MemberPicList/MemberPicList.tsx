import ProfilePic from "@smartComponents/ProfilePic/ProfilePic";
import { IUser } from "@src/models";
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
interface Props {
  members: IUser[];
}
const MemberPicList: React.FC<Props> = (props) => {
  return (
    <div>
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
      <div data-test="member-pic-list">
        <div className={classes.heading}>Pending Members</div>
        <div className={classes.subheading}>
          2 members from faculty of engineering
        </div>
        <div className={classes.piclist}>
          {props.members.map((person: IUser, index: number) => {
            return <ProfilePic size="mini" key={index} PicUrl={person.image} />;
          })}
          <div className={classes.more}>5+</div>
        </div>
      </div>
    </div>
  );
};

export default MemberPicList;
