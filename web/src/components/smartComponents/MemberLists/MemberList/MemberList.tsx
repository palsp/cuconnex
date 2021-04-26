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
          <ProfilePic PicUrl={props.members.image} />
        </div>
        <div className={classes.userInfo}>
          <div className={classes.divUserInfo}>
            <Username value={props.members.name} />
          </div>
          <div className={classes.divUserInfo}>
            <Heading value={props.members.role} size="small" />
          </div>
          <div className={classes.divUserInfo}>
            <Subtitle value={props.members.faculty} />
          </div>
          <div className={classes.divUserInfo}>
            <Subtitle value={props.members.year} />
          </div>
        </div>
        <div className={classes.checkboxDiv} onClick={checkedMemberHandler}>
          <CheckBox />
        </div>
      </div>
    </div>
  );
};

export default MemberList;
