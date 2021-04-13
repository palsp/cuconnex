import React from "react";
import { InviteMember } from "../Icons";
import classes from "./RecruitSign.module.css";
interface Props {
  disabled?: boolean;
  value: string;
  type?: any;
  onClick?: () => void;
}

const RecruitSign: React.FC<Props> = (props) => {
  let cssArray = null;
  let invitemember = false;
  if (props.value === "Recruiting") {
    cssArray = [classes.recruiting];
  } else if (props.value === "Team owner") {
    cssArray = [classes.owner];
  } else if (props.value === "Awaiting") {
    cssArray = [classes.awaiting];
  } else if (props.value === "Invite member") {
    cssArray = [classes.invitemember];
    invitemember = true;
  } else if (props.value === "Request to join") {
    cssArray = [classes.requesttojoin];
  } else if (props.value === "Business") {
    cssArray = [classes.category];
  } else if (props.value === "Technology") {
    cssArray = [classes.category];
  } else if (props.value === "Design") {
    cssArray = [classes.category];
  } else {
    cssArray = [classes.default];
  }
  return (
    <div className={cssArray.join("")}>
      <p data-test="button-props-value">{props.value}</p>
      <div className={classes.icon}>
        {invitemember ? <InviteMember /> : <div />}
      </div>
    </div>
  );
};

export default RecruitSign;
