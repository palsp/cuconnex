import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";

import {
  Button,
  Heading,
  InputField,
  Subtitle,
} from "@dumbComponents/UI/index";
import { ArrowLeft } from "@icons/index";
import { AuthenticatedContext } from "@hooks/AuthenticatedContext";
import { UserContext } from "@context/UserContext";
import { ErrorContext } from "@context/ErrorContext";

import classes from "../AuthPage.module.css";
import { IUserSignin } from "@models/index";
import { userSigninAPI, fetchUserDataAPI } from "@api/index";

interface Props {
  backButtonClickedHandler: () => void;
}
const validationSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("No password provided."),
});
const LoginPrompt: React.FC<Props> = (props) => {
  const [redirect, setRedirect] = useState<JSX.Element>();
  const { setIsAuthenticated } = useContext(AuthenticatedContext);
  const { fetchUserDataHandler } = useContext(UserContext);
  const { setErrorHandler } = useContext(ErrorContext);

  const signinHandler = async (signinData: IUserSignin) => {
    try {
      const resultSignin = await userSigninAPI(signinData);
      console.log(
        "Successfully sent a POST request to signin",
        resultSignin.status
      );
      setIsAuthenticated(true);
      try {
        await fetchUserDataHandler();
        setRedirect(<Redirect to="/landing" />);
      } catch (e) {
        console.log(
          "User has not finished filling in their personal information!"
        );
        setErrorHandler("Please fill out your information!");
        setRedirect(
          <Redirect
            to={{
              pathname: "/personalinformation",
              state: {
                year: "3", // This should be sent back by server
                faculty: "Engineering", // This should be sent back by server
                id: "6131824721", // This should be sent back by server
              },
            }}
          />
        );
      }
    } catch (e) {
      console.log(e.message);
      setErrorHandler(e);
    }
  };
  const loginPrompt = (
    <Formik
      data-test="auth-page-login-form"
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
        console.log("POST /api/auth/signin", data);
        setSubmitting(true);
        resetForm();
        await signinHandler(data);
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField label="Email" name="email" type="input" />
          <div className={classes.InputFieldDiv}>
            <InputField label="Password" name="password" type="password" />
          </div>
          <div className={classes.LoginButton}>
            <Button
              disabled={isSubmitting}
              type="submit"
              data-test="auth-page-login-button"
              value="Log in"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
  return (
    <>
      <div className={classes.divHeader}>
        <Heading value="Welcome Back!" data-test="auth-page-login-header" />
        <Subtitle
          value="Log in with your Chula account"
          data-test="auth-page-login-subtitle"
        />
      </div>

      {loginPrompt}
      {redirect}
      <div className={classes.footerNavigation}>
        <div
          onClick={props.backButtonClickedHandler}
          className={classes.loginBackNavigation}
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
