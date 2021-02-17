import React, { useState } from "react";
import AppLogo from "../../components/dumbComponents/UI/AppLogo/AppLogo";
import Background from "../../components/dumbComponents/UI/Background/Background";
import Button from "../../components/dumbComponents/UI/Button/Button";
import HalfCircleOverlay from "../../components/dumbComponents/UI/HalfCircleOverlay/HalfCircleOverlay";
import InputField from "../../components/dumbComponents/UI/InputField/InputField";
import classes from "./LoginPage.module.css";

const LoginPage: React.FC = () => {
  const [clickLogin, setClickLogin] = useState(false);

  const loginButtonClickedHandler = () => {
    setClickLogin(true);
  };
  let loginPrompt = null;
  if (clickLogin === false) {
    loginPrompt = (
      <div className={classes.Button}>
        <Button
          data-test="login-page-login-button"
          onClick={loginButtonClickedHandler}
          children="Login with Chula SSO"
        />
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
          <Button
            data-test="login-page-next-button"
            onClick={() => {}}
            children="Next"
          />
        </div>
      </>
    );
  }

  return (
    <div>
      <HalfCircleOverlay data-test="login-page-halfcircleoverlay" />
      <Background data-test="login-page-background" />
      <AppLogo data-test="login-page-logo" />

      {/* <h1>{clickLogin.toString()}</h1> */}
      {loginPrompt}
    </div>
  );
};

export default LoginPage;
