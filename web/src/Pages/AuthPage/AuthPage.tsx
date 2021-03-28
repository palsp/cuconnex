import React, { useState, useContext } from "react";

import { motion } from "framer-motion";

import {
  AppLogo,
  Logo,
  Background,
  Button,
  Subtitle,
  Heading,
} from "@dumbComponents/UI/index";

import LoginPrompt from "./LoginPrompt/LoginPrompt";
import SignupPrompt from "./SignupPrompt/SignupPrompt";

import classes from "./AuthPage.module.css";

interface Props {}
const AuthPage: React.FC<Props> = () => {
  const [clickSignup, setClickSignup] = useState(false);
  const [clickLogin, setClickLogin] = useState(false);

  const signupButtonClickedHandler = () => {
    setClickSignup(true);
  };

  const loginButtonClickedHandler = () => {
    setClickLogin(true);
  };
  const backButtonClickedHandler = () => {
    setClickSignup(false);
    setClickLogin(false);
  };
  let authPrompt = null;
  if (clickSignup === false && clickLogin === false) {
    authPrompt = (
      <div className={classes.contentContainer}>
        <div className={classes.logoDiv}>
          <AppLogo data-test="auth-page-logo" />
        </div>
        <div
          className={classes.circle_overlay}
          data-test="auth-page-halfcircleoverlay"
        ></div>
        <div className={classes.Button}>
          <Button
            data-test="auth-page-login-button"
            onClick={loginButtonClickedHandler}
            value="Log in to an existing account"
          />
          <div className={classes.textDiv}>
            <div className={classes.subtitleDiv}>
              <Subtitle value="Don't have an account yet?" />
            </div>
            <div
              data-test="auth-page-signup-button"
              onClick={signupButtonClickedHandler}
            >
              <Heading value="Sign up" size="small" />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (clickSignup === true) {
    authPrompt = (
      <div className={classes.contentContainer}>
        <motion.div
          animate={{ y: -120 }}
          transition={{
            type: "spring",
            delay: 0,
            stiffness: 270,
            damping: 29,
            mass: 3.3,
          }}
          className={classes.contentClick}
        >
          <div className={classes.logo}>
            <Logo />
          </div>
          <motion.div
            animate={{ y: -100 }}
            transition={{
              type: "spring",
              delay: 0,
              stiffness: 270,
              damping: 29,
              mass: 3.3,
            }}
            className={classes.circle_overlay}
          ></motion.div>
          <SignupPrompt
            data-test="auth-page-signup-prompt"
            backButtonClickedHandler={backButtonClickedHandler}
          />
        </motion.div>
      </div>
    );
  } else if (clickLogin === true) {
    authPrompt = (
      <div className={classes.contentContainer}>
        <motion.div
          animate={{ y: -70 }}
          transition={{
            type: "spring",
            delay: 0,
            stiffness: 270,
            damping: 29,
            mass: 3.3,
          }}
          className={classes.contentClick}
        >
          <div className={classes.logo}>
            <Logo />
          </div>
          <motion.div
            animate={{ y: -100 }}
            transition={{
              type: "spring",
              delay: 0,
              stiffness: 270,
              damping: 29,
              mass: 3.3,
            }}
            className={classes.circle_overlay}
          ></motion.div>
          <LoginPrompt
            data-test="auth-page-login-prompt"
            backButtonClickedHandler={backButtonClickedHandler}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes.background}>
          <Background data-test="auth-page-background">
            <div className={classes.content}>{authPrompt}</div>
          </Background>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
