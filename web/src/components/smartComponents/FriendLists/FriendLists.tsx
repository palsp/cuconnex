import React from "react";
import FriendList from "./FriendList/FriendList";

const FriendLists: React.FC = () => {
  const personOne = {
    name: "NAT",
    profilePic: "",
    interest: "Marketing, Startup",
    major: "Engineering",
    year: 3,
  };
  const personTwo = {
    name: "Loong",
    profilePic: "",
    interest: "AI, Machine learning",
    major: "Engineering",
    year: 3,
  };
  return (
    <div>
      <FriendList friend={personOne} />
      <FriendList friend={personTwo} />
    </div>
  );
};

export default FriendLists;
