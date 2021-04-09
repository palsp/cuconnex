import React from "react";
import classes from "./RecruitSign.module.css";
interface Props {
  disabled?: boolean;
  value: string;
  type?: any;
  onClick?: () => void;
}

const RecruitSign: React.FC<Props> = (props) => {
  let cssArray = null;
  if (props.value === "Recruiting") {
    cssArray = [classes.recruiting];
  } else if (props.value === "Team owner") {
    cssArray = [classes.owner];
  } else {
    cssArray = [classes.default];
  }
  return (
    <div className={cssArray.join("")}>
      <p data-test="button-props-value">{props.value}</p>
    </div>
  );
};

export default RecruitSign;
