import React from "react";

import { ProfilePic } from "@smartComponents/index";
import { Heading, Subtitle, Username } from "@dumbComponents/UI/index";
import { PlusCircle } from "@icons/index";
import classes from "./FriendList.module.css";
import { IUser } from "@src/models";

interface Props {
  friend:IUser;
}
const FriendList: React.FC<Props> = (props) => {
  return (
    <div data-test="friend-list" className={classes.friendList}>
      <div className={classes.divFriendList}>
        <div>
          <ProfilePic />
        </div>
        <div className={classes.userInfo}>
          <div className={classes.divUserInfo}>
            <Username
              data-test="friend-list-object-name"
              value={props.friend ? props.friend.name : "test-value"}
            />
          </div>
          <div className={classes.divUserInfo}>
            <Heading
              value={props.friend ? props.friend.faculty : "test-value"}
              size="small"
            />
          </div>

          <div className={classes.divUserInfo}>
            <Subtitle
              value={props.friend ? props.friend.major : "test-value"}
            />
          </div>
        </div>

        <div className={classes.divUserInfo}>
          <PlusCircle />
        </div>
      </div>
    </div>
  );
};

export default FriendList;
