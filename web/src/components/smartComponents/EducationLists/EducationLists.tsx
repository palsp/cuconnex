import React from "react";
import EducationList from "@smartComponents/EducationLists/EducationList/EducationList";
import { Heading } from "@dumbComponents/UI";
import classes from "./EducationLists.module.css";

const educationArray = [
  {
    educationPic: "",
    faculty: "Faculty of Engineering",
    year: "6th year",
    major: "Information and Communication Engineering",
  },
  /*
  {
    educationPic: "",
    faculty: "Bangkok Christian College",
    year: "",
    major: "Science-Math English Program",
  },
  */
];

const EducationLists: React.FC = () => {
  return (
    <div data-test="education-lists">
      <div className={classes.heading}>Education</div>
      {educationArray.map((education, index) => {
        return <EducationList key={index} educationBox={education} />;
      })}
    </div>
  );
};

export default EducationLists;
