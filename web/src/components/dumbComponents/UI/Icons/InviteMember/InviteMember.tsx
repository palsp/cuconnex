import React from "react";
import AddMember from "@assets/addMember.png";
import classes from "./InviteMember.module.css";

const InviteMember: React.FC = () => {
  return (
    <>
      <img
        className={classes.InviteMember}
        src={AddMember}
        alt="Add Member Icon"
      />
    </>
  );
};

export default InviteMember;
