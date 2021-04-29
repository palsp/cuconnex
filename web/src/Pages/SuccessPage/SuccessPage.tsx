import React from "react";
import { Link } from "react-router-dom";
import { Check } from "@icons/index";
import { motion } from "framer-motion";
import containerVariants from "@src/models/models";

import {
  AppLogo,
  Background,
  Button,
  Subtitle,
  Logo,
  Heading,
} from "@dumbComponents/UI/index";

import classes from "./SuccessPage.module.css";

const SuccessPage: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={classes.background}
    >
      <Background data-test="auth-page-background">
              <motion.div
                // animate={{y: -window.innerHeight*0.2}}
                animate={{ y: -(window.innerHeight * 0.1) }}
                className={classes.contentContainer}>
              <div className={classes.logoDiv}>
                <Logo />
              </div>
              <motion.div
                transition={{ ease: "linear", duration: 4, repeat: Infinity }}
                style={{ bottom: -(window.innerHeight * 0.33) }}
                className={classes.circle_overlay}
                data-test="success-page-halfcircleoverlay"
              ></motion.div>
              <div className={classes.divHeader}>
                <Heading
                  data-test="success-page-header"
                  value="Welcome Suki!"
                />
                <Subtitle
                  data-test="success-page-subtitle"
                  value="Your sign up is successful"
                />
              </div>

              <div className={classes.check}>
                <Check circle={true} />
              </div>

              <Link to="/landing">
                <div className={classes.button}>
                  <Button
                    data-test="success-page-button"
                    value="Let's get start"
                  ></Button>
                </div>
              </Link>
              </motion.div>
          </Background>
    </motion.div>
  );
};

export default SuccessPage;
