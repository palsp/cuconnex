import classes from "./HamburgerPrompt.module.css";
import { Heading, Subtitle } from "@dumbComponents/UI";
import React from "react";
import { ArrowRight } from "@dumbComponents/UI/Icons";
const HamburgerPrompt: React.FC = () => {
  return (
    <div className={classes.main}>
      <Heading value="My Teams" />
      <Heading value="My Connections" />
      <Heading value="Account Setting" />
    </div>
  );
};

export default HamburgerPrompt;
