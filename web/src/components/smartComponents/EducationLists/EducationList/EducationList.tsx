import React from "react";
import classes from "./EducationList.module.css";
import { IEducationData } from "@src/models/index";
import { ProfilePic } from "@smartComponents/index";

interface Props {
  // educationBox?: {
  //   educationPic: any;
  //   faculty: string;
  //   year: string;
  //   // major: string;
  // };
  // faculty?: string;
  // year?: string;
  // major?: string;
  educationBox: IEducationData;
}

const EducationList: React.FC<Props> = (props) => {
  return (
    <div data-test="education-list" className={classes.educationList}>
      <div className={classes.educationContainer}>
        <div className={classes.educationLogo}>
          <ProfilePic size="m" PicUrl={props.educationBox.image} />
        </div>
        <div className={classes.educationInfo}>
          <div className={classes.faculty}>{props.educationBox.faculty}</div>
          <div className={classes.faculty}>Year {props.educationBox.year}</div>
          {/* <div className={classes.major}>{props.educationBox.major}</div> */}
        </div>
      </div>
    </div>
  );
};

export default EducationList;
