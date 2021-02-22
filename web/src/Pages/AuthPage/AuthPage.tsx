import React, { useState } from "react";

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
    <div>
      <HalfCircleOverlay data-test="auth-page-halfcircleoverlay" />
      <Background data-test="auth-page-background" />
      <div className={classes.logoDiv}>
        <AppLogo data-test="auth-page-logo" />
      </div>
      {authPrompt}
    </div>
  );
};

export default AuthPage;
