import React from "react";
import RecommendedList from "@smartComponents/RecommendedLists/RecommendedList/RecommendedList";
import classes from "./RecommendedLists.module.css";

const recommendedArray = [
  {
    name: "NAT",
    image: "",
    friendof: "Micky",
    role: "Front-End Developer",
    year: 3,
  },
  {
    name: "Loong",
    image: "",
    friendof: "Loong",
    role: "Front-end Developer",
    year: 3,
  },
  {
    name: "Matoom",
    image: "",
    friendof: "Team",
    role: "UX/UI",
    year: 3,
  },
  {
    name: "Home",
    image: "",
    friendof: "Saint",
    role: "Hardware Engineer",
    year: 3,
  },
  {
    name: "Pal",
    image: "",
    friendof: "Mon",
    role: "Tech Lead",
    year: 3,
  },
  {
    name: "Bird",
    image: "",
    friendof: "Pal",
    role: "Backend-Developer",
    year: 3,
  },
  {
    name: "Bank",
    image: "",
    friendof: "Bird",
    role: "DevOps",
    year: 3,
  },
  {
    name: "Saint",
    image: "",
    friendof: "Anon",
    role: "Data-Analyst",
    year: 3,
  },
  {
    name: "Anon",
    image: "",
    friendof: "Home",
    role: "Fullstack-Developer",
    year: 3,
  },
  {
    name: "Mon",
    image: "",
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
