import classes from "./CreateTeamPage.module.css";
import React, { useEffect, useState } from "react";
import { Close } from "@dumbComponents/UI/Icons";
import { Link } from "react-router-dom";
import SelectMemberPrompt from "./SelectMemberPrompt/SelectMemberPrompt";
import { mockMemberLists } from "@src/mockData";
import { motion } from "framer-motion";
import containerVariants, { IUser } from "@src/models/models";
import { fetchFriendsDataAPI } from "@src/api";
import SelectEventPrompt from "./SelectEventPrompt/SelectEventPrompt";

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
      <div>
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
        <motion.div 
            animate={{ rotate: 180 }}
            transition={{ ease: "linear", duration: 4, repeat: Infinity }}
            style={{ bottom: -window.innerHeight*0.9 }}
            className={classes.circle_overlay}
            data-test="landing-hero-halfcircleoverlay"
          ></motion.div>
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
      className={classes.container}
    >
      {createPrompt}
    </motion.div>
  );
};

export default CreateTeamPage;
