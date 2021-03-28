import React from "react";
import { Link } from "react-router-dom";
import { Check } from "@icons/index";

import {
  AppLogo,
  Background,
  Button,
  Subtitle,
  Heading,
} from "@dumbComponents/UI/index";

import classes from "./SuccessPage.module.css";

const SuccessPage: React.FC = () => {
  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes.background}>
          <Background data-test="auth-page-background">
            <div className={classes.contentContainer}>
              <div className={classes.logoDiv}>
                <AppLogo data-test="auth-page-logo" />
              </div>
              <div
                className={classes.circle_overlay}
                data-test="auth-page-halfcircleoverlay"
              ></div>
              <div className={classes.divHeader}>
                <Heading
                  data-test="success-page-header"
                  value="Welcome Suki!"
                />
                <Subtitle
                  data-test="success-page-subtitle"
                  value="Your sign up is successful"
                ></Subtitle>
                <Check></Check>
              </div>
              <Link to="/landing">
                <div className={classes.button}>
                  <Button
                    data-test="success-page-button"
                    value="Let's get start"
                  ></Button>
                </div>
              </Link>
            </div>
          </Background>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
