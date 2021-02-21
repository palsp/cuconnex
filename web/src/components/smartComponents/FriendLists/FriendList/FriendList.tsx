import React from "react";
import Heading from "../../../dumbComponents/UI/Heading/Heading";
import Send from "../../../dumbComponents/UI/Icons/Send/Send";
import ProfilePic from "../../../dumbComponents/UI/ProfilePic/ProfilePic";
import Subtitle from "../../../dumbComponents/UI/Subtitle/Subtitle";
import Username from "../../../dumbComponents/UI/Username/Username";
import classes from "./FriendList.module.css";

interface Props {
  friend: {
    name: string;
    profilePic: any;
    interest: string;
    major: string;
    year: number;
  };
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
              value={props.friend.name}
            />
          </div>
          <div className={classes.divUserInfo}>
            <Heading value={props.friend.interest} size="small" />
          </div>

          <div className={classes.divUserInfo}>
            <Subtitle value={props.friend.major} />
          </div>
        </div>

        <div className={classes.divUserInfo}>
          <Send />
        </div>
      </div>
    </div>
  );
};

export default FriendList;
