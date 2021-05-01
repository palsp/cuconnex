import React, { useState, useEffect } from "react";

import {
  Heading,
  Subtitle,
  Username,
  CheckBox,
  RecruitSign,
} from "@dumbComponents/UI/index";
import { ProfilePic } from "@smartComponents/index";
import { Search } from "@icons/index";
import classes from "./MemberList.module.css";
import { UsersData } from "@src/mockData/Models";
import { IUser, IUserFriend, IUserFriendExtended } from "@src/models";

interface Props {
  members: IUserFriendExtended;
  selectMemberListHandler: any;
}

const MemberListForPrompt: React.FC<Props> = (props) => {
  const [checked, setChecked] = useState(false);
  const checkedMemberHandler = () => {
    setChecked((prevState) => !prevState);
  };
  const facultyYear = props.members.faculty + ", " + props.members.year;
  useEffect(() => {
    props.selectMemberListHandler(checked);
  }, [checked]);
  let statusTab = null;
  if (props.members.status === "invited") {
    statusTab = <RecruitSign value="Pending"></RecruitSign>;
  }
  if (props.members.status === "notInvited") {
    <div className={classes.checkboxDiv} onClick={checkedMemberHandler}>
      <CheckBox />
    </div>;
  }
  if (props.members.status === "requestedToJoin") {
    statusTab = <RecruitSign value="Pending"></RecruitSign>;
  }

  return (
    <div className={classes.memberList}>
      <div className={classes.divFriendList}>
        <div>
          <ProfilePic PicUrl={props.members.image} />
        </div>
        <div className={classes.userInfo}>
          <div className={classes.divUsernameInfo}>{props.members.name}</div>
          <div className={classes.divRoleInfo}>{props.members.role}</div>
          <div className={classes.divFacultyInfo}>
            {props.members.faculty + ", " + props.members.year}
          </div>
        </div>
        <div className={classes.checkboxDiv}>{statusTab}</div>
      </div>
    </div>
  );
};

export default MemberListForPrompt;
