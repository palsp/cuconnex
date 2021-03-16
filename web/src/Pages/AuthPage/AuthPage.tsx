import React, { useState } from "react";

import {
  AppLogo,
  Background,
  Button,
  HalfCircleOverlay,
  Subtitle,
  Heading,
} from "@dumbComponents/UI/index";

import LoginPrompt from "./LoginPrompt/LoginPrompt";
import SignupPrompt from "./SignupPrompt/SignupPrompt";

import classes from "./AuthPage.module.css";

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
    );
  } else if (clickSignup === true) {
    authPrompt = (
      <SignupPrompt
        data-test="auth-page-signup-prompt"
        backButtonClickedHandler={backButtonClickedHandler}
      />
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
          <HalfCircleOverlay data-test="auth-page-halfcircleoverlay" />
          <Background data-test="auth-page-background" />
        </div>

        <div className={classes.logoDiv}>
          <AppLogo data-test="auth-page-logo" />
        </div>

        <div className={classes.content}>{authPrompt}</div>
      </div>
    </div>
  );
};

export default AuthPage;
