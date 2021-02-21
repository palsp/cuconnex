import React from "react";
import FriendList from "./FriendList/FriendList";

const personArray = [
  {
    name: "NAT",
    profilePic: "",
    interest: "Marketing, Startup",
    major: "Engineering",
    year: 3,
  },
  {
    name: "Loong",
    profilePic: "",
    interest: "AI, Machine learning",
    major: "Engineering",
    year: 3,
  },
  {
    name: "Matoom",
    profilePic: "",
    interest: "Sugi",
    major: "Engineering",
    year: 3,
  },
  {
    name: "Home",
    profilePic: "",
    interest: "Defi",
    major: "Engineering",
    year: 3,
  },
  {
    name: "Pal",
    profilePic: "",
    interest: "PS5",
    major: "Engineering",
    year: 3,
  },
  {
    name: "Bird",
    profilePic: "",
    interest: "Girls",
    major: "Engineering",
    year: 3,
  },
  {
    name: "Bank",
    profilePic: "",
    interest: "Sleep",
    major: "Engineering",
    year: 3,
  },
  {
    name: "Saint",
    profilePic: "",
    interest: "City",
    major: "Engineering",
    year: 3,
  },
  {
    name: "Anon",
    profilePic: "",
    interest: "Developer",
    major: "Engineering",
    year: 3,
  },
  {
    name: "Mon",
    profilePic: "",
    interest: "PM",
    major: "Engineering",
    year: 3,
  },
];
const FriendLists: React.FC = () => {
  return (
    <div data-test="friendLists">
      {personArray.map((person, index) => {
        return <FriendList key={index} friend={person} />;
      })}
    </div>
  );
};

export default FriendLists;
