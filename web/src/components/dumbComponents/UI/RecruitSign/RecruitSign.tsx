import React from "react";
import { Check, InviteMember } from "../Icons";
import classes from "./RecruitSign.module.css";
interface Props {
  disabled?: boolean;
  value: string;
  type?: any;
  onClick?: () => void;
}

const RecruitSign: React.FC<Props> = (props) => {
  const cssArray = [classes.baseSign];
  let invitemember = false;
  let connected = false;
  if (props.value === "Recruiting") {
    cssArray.push(classes.recruiting);
  } else if (props.value === "Team owner") {
    cssArray.push(classes.owner);
  } else if (props.value === "Awaiting") {
    cssArray.push(classes.awaiting);
  } else if (props.value === "Invite member") {
    cssArray.push(classes.invitemember);
    invitemember = true;
  } else if (props.value === "Request to join") {
    cssArray.push(classes.requesttojoin);
  } else if (props.value === "Business") {
    cssArray.push(classes.category);
  } else if (props.value === "Technology") {
    cssArray.push(classes.category);
  } else if (props.value === "Design") {
    cssArray.push(classes.category);
  } else if (props.value === "Pending") {
    cssArray.push(classes.pending);
  } else if (props.value === "Connected") {
    cssArray.push(classes.connected);
    connected = true;
  } else if (props.value === "Accepted") {
    cssArray.push(classes.connected);
    connected = true;
  } else if (props.value === "Declined") {
    cssArray.push(classes.declined);
    connected = true;
  } else if (props.value === "Accept") {
    cssArray.push(classes.accept);
  } else if (props.value === "Reject") {
    cssArray.push(classes.reject);
  } else {
    cssArray.push(classes.default);
  }
  return (
    <div className={cssArray.join(" ")}>
      <p data-test="button-props-value">{props.value}</p>
      <div className={classes.icon}>
        {invitemember ? <InviteMember /> : <div />}
        {connected ? <Check circle={false} /> : <div />}
      </div>
    </div>
  );
};

export default RecruitSign;
