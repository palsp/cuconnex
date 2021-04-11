import React from "react";
import classes from "./Group.module.css";
import Users from "@assets/users.svg";

const Group: React.FC = () => {
  return (
    <>
      <img
        className={classes.groupIcon}
        data-test="users-icon"
        src={Users}
        alt="Group of Users"
      />
    </>
  );
};

export default Group;
