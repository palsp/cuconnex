import React from "react";
import { Link } from "react-router-dom";
import classes from "./HamburgerPrompt.module.css";
import { Heading } from "@dumbComponents/UI";

const HamburgerPrompt: React.FC = () => {
  return (
    <div className={classes.main}>
      <Link style={{ textDecoration: "none" }} to="/myteams">
        <Heading value="My Teams" />
      </Link>
      <Link style={{ textDecoration: "none" }} to="/friendlists">
        <Heading value="My Connections" />
      </Link>
      <Heading value="Account Setting" />
    </div>
  );
};

export default HamburgerPrompt;
