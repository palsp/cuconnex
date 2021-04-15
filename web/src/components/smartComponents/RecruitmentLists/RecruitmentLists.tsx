import React from "react";
import RecruitmentList from "@smartComponents/RecruitmentLists/RecruitmentList/RecruitmentList";
import classes from "./RecruitmentLists.module.css";

const recruitmentArray = [
  {
    recruitmentPic: "",
    role: "Developer",
    description: "Have a basic knowledge of Node.js and SQL",
    category: "Technology",
  },
  {
    recruitmentPic: "",
    role: "Loongallday Girls",
    description: "Have a basic knowledge of Loong's bed",
    category: "Business",
  },
];

const RecruitmentLists: React.FC = () => {
  return (
    <div data-test="recruitment-lists">
      <div className={classes.heading}>
        Current recruitment ({recruitmentArray.length})
      </div>
      {recruitmentArray.map((recruitment, index) => {
        return <RecruitmentList key={index} recruitmentBox={recruitment} />;
      })}
    </div>
  );
};

export default RecruitmentLists;
