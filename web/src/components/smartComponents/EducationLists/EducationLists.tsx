import React from "react";
import EducationList from "@smartComponents/EducationLists/EducationList/EducationList";
import { Heading } from "@dumbComponents/UI";
import classes from "./EducationLists.module.css";
import { IEducationData } from "@src/models/index";

// const educationArray = [
//   {
//     educationPic: "",
//     faculty: "Faculty of Engineering",
//     year: "6th year",
//     major: "Information and Communication Engineering",
//   },
//   /*
//   {
//     educationPic: "",
//     faculty: "Bangkok Christian College",
//     year: "",
//     major: "Science-Math English Program",
//   },
//   */
// ];

interface Props {
  education: IEducationData[] | [];
  // faculty: string;
  // year: string;
}

const EducationLists: React.FC<Props> = (props) => {
  return (
    <div data-test="education-lists">
      <div className={classes.heading}>Education</div>
      {props.education.map((education: IEducationData, index: number) => {
        return <EducationList key={index} educationBox={education} />;
      })}
    </div>
  );
};

export default EducationLists;
