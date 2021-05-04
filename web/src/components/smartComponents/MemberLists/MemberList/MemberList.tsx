import React, { useState, useEffect } from "react";

import {
  Heading,
  Subtitle,
  Username,
  CheckBox,
} from "@dumbComponents/UI/index";
import { ProfilePic } from "@smartComponents/index";
import { Search } from "@icons/index";
import classes from "./MemberList.module.css";
import { UsersData } from "@src/mockData/Models";
import { IUser, IUserFriend } from "@src/models";
import { Link } from "react-router-dom";

interface Props {
  members: IUserFriend;
  selectMemberListHandler: any;
}

const MemberList: React.FC<Props> = (props) => {
  const [checked, setChecked] = useState(false);
  const checkedMemberHandler = () => {
    setChecked((prevState) => !prevState);
  };
  const facultyYear = props.members.faculty + ", " + props.members.year;
  useEffect(() => {
    props.selectMemberListHandler(checked);
  }, [checked]);

  return (
    <div className={classes.memberList}>
      <div className={classes.divFriendList}>
        <div>
          <Link
            to={{
              pathname: "/profile",
              state: {
                users: props.members,
              },
            }}
          >
            <ProfilePic PicUrl={props.members.image} />
          </Link>
        </div>
        <div className={classes.userInfo}>
          <Link
            to={{
              pathname: "/profile",
              state: {
                users: props.members,
              },
            }}
          >
            <div className={classes.divUsernameInfo}>{props.members.name}</div>
            <div className={classes.divRoleInfo}>{props.members.role}</div>
            <div className={classes.divFacultyInfo}>
              {props.members.faculty + ", " + props.members.year}
            </div>
          </Link>
        </div>
        <div className={classes.checkboxDiv} onClick={checkedMemberHandler}>
          <CheckBox />
        </div>
      </div>
    </div>
  );
};

export default MemberList;
