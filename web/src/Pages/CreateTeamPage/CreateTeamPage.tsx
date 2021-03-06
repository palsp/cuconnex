import classes from "./CreateTeamPage.module.css";
import React, { useEffect, useState } from "react";
import { Close } from "@dumbComponents/UI/Icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import containerVariants, { IUser } from "@src/models/models";
import SelectEventPrompt from "./SelectEventPrompt/SelectEventPrompt";
import WaveCanvasBg from "@src/canvas/WaveCanvasBg";

const CreateTeamPage: React.FC = () => {
  const [clickSelectScope, setClickSelectScope] = useState<boolean>(true);
  const [clickSelectEvent, setClickSelectEvent] = useState<boolean>(false);
  const [scopeType, setScopeType] = useState<number>(0);
  const personalButtonClickedHandler = () => {
    setClickSelectEvent(true);
    setClickSelectScope(false);
    setScopeType(1);
  };

  const chulaButtonClickedHandler = () => {
    setClickSelectEvent(true);
    setClickSelectScope(false);
    setScopeType(2);
  };
  const nonChulaButtonClickedHandler = () => {
    setClickSelectEvent(true);
    setClickSelectScope(false);
    setScopeType(3);
  };

  const createPrompt =
    clickSelectScope === true ? (
      <div className={classes.relativeDiv}>
        <div className={classes.waveBg}>
          <WaveCanvasBg
            width={window.innerWidth}
            height={window.innerHeight * 0.95}
          />
        </div>
        <div className={classes.headerContainer}>
          <div className={classes.closeDiv}>
            <Link to="landing">
              <Close />
            </Link>
          </div>
        </div>
        <div className={classes.heroDiv}>
          <div className={classes.topicDiv}>Your team&apos;s scope</div>
          <div>
            <div
              onClick={() => personalButtonClickedHandler()}
              className={classes.scopeDiv}
            >
              Personal Project
            </div>
            <div
              onClick={() => chulaButtonClickedHandler()}
              className={classes.scopeDiv}
            >
              Chula Competition
            </div>
            <div
              onClick={() => nonChulaButtonClickedHandler()}
              className={classes.scopeDiv}
            >
              Non-Chula Competition
            </div>
          </div>
        </div>
      </div>
    ) : clickSelectEvent === true ? (
      <div>
        <SelectEventPrompt />
      </div>
    ) : (
      <div>Error Occurs : Contact Staff</div>
    );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={classes.page}
    >
      {createPrompt}
    </motion.div>
  );
};

export default CreateTeamPage;
