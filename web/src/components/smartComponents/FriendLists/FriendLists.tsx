import React from "react";
import FriendList from "@smartComponents/FriendLists/FriendList/FriendList";
import { IUser } from "@src/models";

interface Props{
  connections:IUser[] | [];
}
const FriendLists: React.FC<Props> = (props) => {
  return (
    <div data-test="friendLists">
      {props.connections.map((person:IUser, index:number) => {
        return <FriendList key={index} friend={person} />;
      })}
    </div>
  );
};

export default FriendLists;
