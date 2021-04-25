import React from "react";
import classes from "./EducationList.module.css";
import { Logo } from "@dumbComponents/UI/index";

interface Props {
  educationBox?: {
    educationPic: any;
    faculty: string;
    year: string;
    major: string;
  };
  faculty?:string;
  year?:string,
  major?:string,
}

const EducationList: React.FC<Props> = (props) => {
  return (
    <div data-test="education-list" className={classes.educationList}>
      <div className={classes.educationContainer}>
        <div className={classes.educationLogo}>
          <Logo />
        </div>
        <div className={classes.educationInfo}>
          <div className={classes.faculty}>
            {props.faculty} - {props.year}
          </div>
          <div className={classes.major}>{props.major}</div>
        </div>
      </div>
    </div>
  );
};

export default EducationList;
