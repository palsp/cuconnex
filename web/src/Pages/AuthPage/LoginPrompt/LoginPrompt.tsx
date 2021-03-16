import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Heading,
  InputField,
  Subtitle,
} from "@dumbComponents/UI/index";
import { ArrowLeft } from "@icons/index";

import classes from "../AuthPage.module.css";

interface Props {
  backButtonClickedHandler: () => void;
}

const LoginPrompt: React.FC<Props> = (props) => {
  return (
    <>
      <div className={classes.divHeader}>
        <Heading value="Welcome Back!" data-test="auth-page-login-header" />
        <Subtitle
          value="Log in with your Chula account"
          data-test="auth-page-login-subtitle"
        />
      </div>
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
      <div className={classes.divSubtitle}>
        <Subtitle value="Forget your password?" />
      </div>

      <div className={classes.Button}>
        <Link to="/selectInterests">
          <Button data-test="auth-page-login-button" value="Log in" />
        </Link>
      </div>
      <div className={classes.footerNavigation}>
        <div
          onClick={props.backButtonClickedHandler}
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
};

export default LoginPrompt;
