import React from "react";
import FriendList from "@smartComponents/FriendLists/FriendList/FriendList";
import { IUser, IUserFriend } from "@src/models";

interface Props{
  connections:IUserFriend[] | [];
}
const FriendLists: React.FC<Props> = (props) => {
  return (
    <div data-test="friendLists">
      {props.connections.map((person:IUserFriend, index:number) => {
        return <FriendList key={index} friend={person} />;
      })}
    </div>
  );
};

export default FriendLists;
