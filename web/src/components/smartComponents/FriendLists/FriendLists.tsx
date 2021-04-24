import React from "react";
import FriendList from "@smartComponents/FriendLists/FriendList/FriendList";

const personArray = [
  {
    name: "NAT",
    image: "",
    interest: "Marketing, Startup",
    major: "Engineering",
    year: 3,
  },
  {
    name: "Loong",
    image: "",
    interest: "AI, ",
    major: "Engineering",
    year: 3,
  },
  {
    name: "Matoom",
    image: "",
    interest: "Sugi",
    major: "Engineering",
    year: 3,
  },
  {
    name: "Home",
    image: "",
    interest: "Defi",
    major: "Engineering",
    year: 3,
  },
  {
    name: "Pal",
    image: "",
    interest: "PS5",
    major: "Engineering",
    year: 3,
  },
  {
    name: "Bird",
    image: "",
    interest: "Girls",
    major: "Engineering",
    year: 3,
  },
  {
    name: "Bank",
    image: "",
    interest: "Sleep",
    major: "Engineering",
    year: 3,
  },
  {
    name: "Saint",
    image: "",
    interest: "City",
    major: "Engineering",
    year: 3,
  },
  {
    name: "Anon",
    image: "",
    interest: "Developer",
    major: "Engineering",
    year: 3,
  },
  {
    name: "Mon",
    image: "",
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
