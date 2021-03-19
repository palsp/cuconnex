import React, { useState } from "react";
import { motion } from 'framer-motion';
import AppLogo from "../../components/dumbComponents/UI/AppLogo/AppLogo";
import Background from "../../components/dumbComponents/UI/Background/Background";
import Button from "../../components/dumbComponents/UI/Button/Button";
import HalfCircleOverlay from "../../components/dumbComponents/UI/HalfCircleOverlay/HalfCircleOverlay";
import classes from "./AuthPage.module.css";
import Subtitle from "../../components/dumbComponents/UI/Subtitle/Subtitle";
import Heading from "../../components/dumbComponents/UI/Heading/Heading";
import LoginPrompt from "./LoginPrompt/LoginPrompt";
import SignupPrompt from "./SignupPrompt/SignupPrompt";

const AuthPage: React.FC = () => {
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
            <AppLogo data-test="auth-page-logo" /></div>
        <div className={classes.circle_overlay}></div>
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
      <motion.div 
        animate={{ y: -120 }}
        transition={{ 
          type: "spring",
          delay: 0,
          stiffness: 270,
          damping: 29,
          mass: 3.3,
        }}
        className={classes.contentClick}>
        <div className={classes.logoDiv}>
          <AppLogo data-test="auth-page-logo" />
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
          className={classes.circle_overlay}>
        </motion.div>
        <div className={classes.signupPrompt}>
          <SignupPrompt
            data-test="auth-page-signup-prompt"
            backButtonClickedHandler={backButtonClickedHandler}
          />
        </div>
      </motion.div>
    );
  } else if (clickLogin === true) {
    authPrompt = (
      <LoginPrompt
        data-test="auth-page-login-prompt"
        backButtonClickedHandler={backButtonClickedHandler}
      />
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
