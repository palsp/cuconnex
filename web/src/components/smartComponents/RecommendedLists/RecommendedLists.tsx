import React from "react";
import RecommendedList from "@smartComponents/RecommendedLists/RecommendedList/RecommendedList";
import classes from "./RecommendedLists.module.css";

const recommendedArray = [
  {
    name: "NAT",
    profilePic: "",
    friendof: "Micky",
    role: "Front-End Developer",
    year: 3,
  },
  {
    name: "Loong",
    profilePic: "",
    friendof: "Loong",
    role: "Front-end Developer",
    year: 3,
  },
  {
    name: "Matoom",
    profilePic: "",
    friendof: "Team",
    role: "UX/UI",
    year: 3,
  },
  {
    name: "Home",
    profilePic: "",
    friendof: "Saint",
    role: "Hardware Engineer",
    year: 3,
  },
  {
    name: "Pal",
    profilePic: "",
    friendof: "Mon",
    role: "Tech Lead",
    year: 3,
  },
  {
    name: "Bird",
    profilePic: "",
    friendof: "Pal",
    role: "Backend-Developer",
    year: 3,
  },
  {
    name: "Bank",
    profilePic: "",
    friendof: "Bird",
    role: "DevOps",
    year: 3,
  },
  {
    name: "Saint",
    profilePic: "",
    friendof: "Anon",
    role: "Data-Analyst",
    year: 3,
  },
  {
    name: "Anon",
    profilePic: "",
    friendof: "Home",
    role: "Fullstack-Developer",
    year: 3,
  },
  {
    name: "Mon",
    profilePic: "",
    friendof: "Muji",
    role: "Project Manager",
    year: 3,
  },
];
const RecommendedLists: React.FC = () => {
  return (
    <div className={classes.container} data-test="recommendedLists">
      {recommendedArray.map((person, index) => {
        return <RecommendedList key={index} recommended={person} />;
      })}
    </div>
  );
};

export default RecommendedLists;
