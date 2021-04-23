import React, { useState } from "react";

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

interface Props {
  members: UsersData;
  selectMemberListHandler: any;
}

interface InterestListsArray {
  Technology: string[];
  Business: string[];
  Design: string[];
}

const MemberList: React.FC<Props> = (props) => {
  const [checked, setChecked] = useState(false);
  const checkedMemberHandler = () => {
    setChecked((prevState) => !prevState);
  };

  const memberInterest = (interestArrays:InterestListsArray) => {
    const interestArray = interestArrays.Technology.concat(interestArrays.Business).concat(interestArrays.Design);
    interestArray.forEach(element => console.log(element));
    // {props.members.interests.Technology.forEach(element) => {<Heading value={element} size="small"/>)}
    // return interests;
  };
  
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
            {memberInterest(props.members.interests)}
            <Heading value={props.members.image} size="small" />
          </div>
          <div className={classes.divUserInfo}>
            <Subtitle value={props.members.faculty} />
          </div>
        </div>
        <div onClick={() => props.selectMemberListHandler(checked)}>
          <div className={classes.checkboxDiv} onClick={checkedMemberHandler}>
            <CheckBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberList;
