import React, { useState } from "react";
import { Link } from "react-router-dom";

import AppLogo from "../../components/dumbComponents/UI/AppLogo/AppLogo";
import Background from "../../components/dumbComponents/UI/Background/Background";
import Button from "../../components/dumbComponents/UI/Button/Button";
import HalfCircleOverlay from "../../components/dumbComponents/UI/HalfCircleOverlay/HalfCircleOverlay";
import InputField from "../../components/dumbComponents/UI/InputField/InputField";
import classes from "./LoginPage.module.css";
import DotMorePage from "../../components/dumbComponents/UI/DotMorePage/DotMorePage";
import Subtitle from "../../components/dumbComponents/UI/Subtitle/Subtitle";
import Heading from "../../components/dumbComponents/UI/Heading/Heading";
import ArrowLeft from "../../components/dumbComponents/UI/Icons/ArrowLeft/ArrowLeft";

const LoginPage: React.FC = () => {
  const [clickLogin, setClickLogin] = useState(false);

  const loginButtonClickedHandler = () => {
    setClickLogin(true);
  };

  const backButtonClickedHandler = () => {
    setClickLogin(false);
  };
  let loginPrompt = null;
  if (clickLogin === false) {
    loginPrompt = (
      <div className={classes.Button}>
        <Button
          data-test="login-page-login-button"
          onClick={loginButtonClickedHandler}
          value="Log in to an existing account"
        />
        <div className={classes.textDiv}>
          <div className={classes.subtitleDiv}>
            <Subtitle value="Don't have an account yet?" />
          </div>
          <Heading value="Sign up" size="small" />
        </div>
      </div>
    );
  } else {
    loginPrompt = (
      <>
        <div className={classes.InputFieldDiv}>
          <InputField data-test="login-page-input-fields" value="Username" />
        </div>
        <div className={classes.InputFieldDiv}>
          <InputField
            data-test="login-page-input-fields"
            value="Student email"
          />
        </div>
        <div className={classes.InputFieldDiv}>
          <InputField
            data-test="login-page-input-fields"
            value="Password for Chula SSO"
            type="password"
          />
        </div>
        <div className={classes.Button}>
          <Link to="/selectInterests">
            <Button data-test="login-page-next-button" value="Next" />
          </Link>
        </div>
        <div className={classes.footerNavigation}>
          <DotMorePage data-test="dot-icon" amount={1} />
          <div
            onClick={backButtonClickedHandler}
            className={classes.backNavigation}
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
    <div>
      <HalfCircleOverlay data-test="login-page-halfcircleoverlay" />
      <Background data-test="login-page-background" />
      <div className={classes.logoDiv}>
        <AppLogo data-test="login-page-logo" />
      </div>

      {loginPrompt}
    </div>
  );
};

export default LoginPage;
