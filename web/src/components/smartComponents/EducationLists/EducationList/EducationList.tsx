import React from "react";
import classes from "./EducationList.module.css";
import { Logo } from "@dumbComponents/UI";

interface Props {
  educationBox: {
    educationPic: any;
    faculty: string;
    year: string;
    major: string;
  };
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
            {props.educationBox.faculty} - {props.educationBox.year}
          </div>
          <div className={classes.major}>{props.educationBox.major}</div>
        </div>
      </div>
    </div>
  );
};

export default EducationList;
