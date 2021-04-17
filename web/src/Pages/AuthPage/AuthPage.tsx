import React, { useState, useEffect, useContext } from "react";

import { motion } from "framer-motion";
import { Redirect } from "react-router";

import {
  AppLogo,
  Logo,
  Background,
  Button,
  Subtitle,
  Heading,
} from "@dumbComponents/UI/index";
import { AuthenticatedContext } from "@hooks/AuthenticatedContext";

import { fetchUserDataAPI } from "@api/index";

import LoginPrompt from "./LoginPrompt/LoginPrompt";
import SignupPrompt from "./SignupPrompt/SignupPrompt";

import classes from "./AuthPage.module.css";
import { UserDataContext } from "@hooks/UserDataContext";

const AuthPage: React.FC = () => {
  const [clickSignup, setClickSignup] = useState<boolean>(false);
  const [clickLogin, setClickLogin] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const { setIsAuthenticated } = useContext(AuthenticatedContext);
  const { setUserData } = useContext(UserDataContext);

  const fetchDataHandler = async () => {
    try {
      const userData = await fetchUserDataAPI();
      console.log("SUCCESS fetchDataHandler", userData);
      setIsAuthenticated(true);
      setUserData(userData.data);
      setRedirect(true);
    } catch (e) {
      console.log("fetchDataHandler error", e);
    }
  };

  useEffect(() => {
    fetchDataHandler();
    return () => {
      setClickLogin(false);
      setClickSignup(false);
      setRedirect(false);
    };
  }, []);

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

  const routeRedirect = redirect ? <Redirect to="/landing" /> : null;

  let animateHeight = window.innerHeight;
  if (window.innerHeight < 750) {
    animateHeight = -(window.innerHeight * 0.25);
  } else if (window.innerHeight > 750) {
    animateHeight = -(window.innerHeight * 0.05);
  }

  const authPrompt =
    clickSignup === true ? (
      <motion.div
        animate={{ y: animateHeight }}
        transition={{
          type: "spring",
          delay: 0,
          stiffness: 270,
          damping: 29,
          mass: 3.3,
        }}
        className={classes.signupPrompt}
      >
        <div className={classes.logo}>
          <Logo data-test="auth-page-logo" />
        </div>
        <motion.div
          animate={{ y: -60 }}
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
    ) : clickLogin === true ? (
      <motion.div
        animate={{ y: animateHeight * 0.75 }}
        transition={{
          type: "spring",
          delay: 0,
          stiffness: 270,
          damping: 29,
          mass: 3.3,
        }}
        className={classes.loginPrompt}
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
    ) : (
      <div className={classes.authPrompt}>
        <div className={classes.logoDiv}>
          <AppLogo data-test="auth-page-logo" />
        </div>
        <div
          className={classes.circle_overlay}
          style={{ bottom: -(window.innerHeight * 0.33) }}
          data-test="auth-page-halfcircleoverlay"
        ></div>
        <div className={classes.Button}>
          <Button
            data-test="auth-page-login-button"
            onClick={loginButtonClickedHandler}
            value="Log in to an existing account"
          />
        </div>
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
    );

  return (
    <Background data-test="auth-page-background">
      <div className={classes.content}>{authPrompt}</div>
      {routeRedirect}
    </Background>
  );
};

export default AuthPage;
