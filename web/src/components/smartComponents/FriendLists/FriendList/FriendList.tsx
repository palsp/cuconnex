import React from "react";

import { ProfilePic } from "@smartComponents/index";
import { Heading, Subtitle, Username } from "@dumbComponents/UI/index";
import { PlusCircle } from "@icons/index";
import classes from "./FriendList.module.css";
import { IUser, IUserFriend } from "@src/models";
import { Link } from "react-router-dom";

interface Props {
  friend: IUserFriend;
}
const FriendList: React.FC<Props> = (props) => {
  return (
    <div className={classes.linkDiv}>
      <Link
        to={{
          pathname: "/profile",
          state: {
            users: props.friend,
          },
        }}
      >
        <div data-test="friend-list" className={classes.friendList}>
          <div className={classes.divFriendList}>
            <div>
              <ProfilePic PicUrl={props.friend?.image} />
            </div>
            <div className={classes.userInfo}>
              <div className={classes.divUsernameInfo}>
                {props.friend ? props.friend.name : "test-value"}
              </div>
              <div className={classes.divUserRole}>
                <div className={classes.roleDiv}>
                  {props.friend ? props.friend.role : "test-value"}
                </div>
              </div>
              <div className={classes.divFacultyInfo}>
                {props.friend ? props.friend.faculty : "test-value"},
                {` ${props.friend?.year}`}
              </div>
            </div>

            <div className={classes.divUserInfo}></div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FriendList;
