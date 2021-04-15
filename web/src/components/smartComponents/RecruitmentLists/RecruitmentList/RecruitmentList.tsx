import React from "react";
import classes from "./RecruitmentList.module.css";
import { Logo, RecruitSign } from "@dumbComponents/UI";

interface Props {
  recruitmentBox: {
    recruitmentPic: any;
    role: string;
    description: string;
    category: string;
  };
}

const RecruitmentList: React.FC<Props> = (props) => {
  return (
    <div data-test="recruitment-list" className={classes.recruitmentList}>
      <div className={classes.recruitmentContainer}>
        <div className={classes.recruitmentLogo}>
          <Logo />
        </div>
        <div className={classes.recruitmentInfo}>
          <div className={classes.role}>{props.recruitmentBox.role}</div>
          <div className={classes.description}>
            {props.recruitmentBox.description}
          </div>
          <div className={classes.category}>
            <RecruitSign value={props.recruitmentBox.category} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentList;
