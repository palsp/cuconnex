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
              <ProfilePic />
            </div>
            <div className={classes.userInfo}>
              <div className={classes.divUsernameInfo}>
                {props.friend ? props.friend.name : "test-value"}
              </div>
              <div className={classes.divUserInterest}>
                <div className={classes.interestDiv}>
                  {props.friend ? props.friend.interests[0] : "test-value"}
                </div>
                <div className={classes.interestDiv}>
                   &nbsp;, &nbsp;
                </div>
                <div className={classes.interestDiv}>
                  {props.friend ? props.friend.interests[2] : "test-value"}
                </div>

              </div>

              <div className={classes.divFacultyInfo}>
                {props.friend ? props.friend.faculty : "test-value"}
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
