import React, { useState } from "react";
import { Link } from "react-router-dom";

import AppLogo from "../../components/dumbComponents/UI/AppLogo/AppLogo";
import Background from "../../components/dumbComponents/UI/Background/Background";
import Button from "../../components/dumbComponents/UI/Button/Button";
import HalfCircleOverlay from "../../components/dumbComponents/UI/HalfCircleOverlay/HalfCircleOverlay";
import InputField from "../../components/dumbComponents/UI/InputField/InputField";
import classes from "./AuthPage.module.css";
import DotMorePage from "../../components/dumbComponents/UI/DotMorePage/DotMorePage";
import Subtitle from "../../components/dumbComponents/UI/Subtitle/Subtitle";
import Heading from "../../components/dumbComponents/UI/Heading/Heading";
import ArrowLeft from "../../components/dumbComponents/UI/Icons/ArrowLeft/ArrowLeft";

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
      <>
        <Heading value="Welcome" data-test="auth-page-signup-header" />
        <Subtitle
          value="Let's find your right team in Chula"
          data-test="auth-page-signup-subtitle"
        />
        <div className={classes.InputFieldDiv}>
          <InputField
            data-test="auth-page-signup-input-fields"
            value="Username"
          />
        </div>
        <div className={classes.InputFieldDiv}>
          <InputField
            data-test="auth-page-signup-input-fields"
            value="Student email"
          />
        </div>
        <div className={classes.InputFieldDiv}>
          <InputField
            data-test="auth-page-signup-input-fields"
            value="Password for Chula SSO"
            type="password"
          />
        </div>
        <div className={classes.Button}>
          <Link to="/selectInterests">
            <Button data-test="auth-page-signup-next-button" value="Next" />
          </Link>
        </div>
        <div className={classes.footerNavigation}>
          <DotMorePage data-test="dot-icon" amount={1} />
          <div
            onClick={backButtonClickedHandler}
            className={classes.backNavigation}
            data-test="back-navigation"
          >
            <ArrowLeft />
            <div className={classes.divFooterHeading}>
              <Heading value="Back" size="small" />
            </div>
          </div>
        </div>
      </>
    );
  } else if (clickLogin === true) {
    authPrompt = (
      <>
        <Heading value="Welcome Back!" data-test="auth-page-login-header" />
        <Subtitle
          value="Log in with your Chula account"
          data-test="auth-page-login-subtitle"
        />

        <div className={classes.InputFieldDiv}>
          <InputField
            data-test="auth-page-login-input-fields"
            value="
            Email or username"
          />
        </div>
        <div className={classes.InputFieldDiv}>
          <InputField
            data-test="auth-page-login-input-fields"
            value="Password"
            type="password"
          />
        </div>
        <div className={classes.Button}>
          <Link to="/selectInterests">
            <Button data-test="auth-page-login-button" value="Log in" />
          </Link>
        </div>
        <div className={classes.footerNavigation}>
          <div
            onClick={backButtonClickedHandler}
            className={classes.backNavigation}
            data-test="back-navigation"
          >
            <ArrowLeft />
            <div className={classes.divFooterHeading}>
              <Heading value="Back" size="small" />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes.background}>
          <HalfCircleOverlay data-test="login-page-halfcircleoverlay" />
          <Background data-test="login-page-background" />
        </div>
        <div className={classes.logoDiv}>
          <AppLogo data-test="login-page-logo" />
        </div>

        {authPrompt}

      </div>
    </div>
  );
};

export default AuthPage;
