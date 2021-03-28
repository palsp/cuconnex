import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Formik, Form } from "formik";
import axios from "@src/axiosInstance/axiosInstance";
import * as yup from "yup";

import {
  Button,
  Heading,
  InputField,
  Subtitle,
} from "@dumbComponents/UI/index";
import { ArrowLeft } from "@icons/index";
import { AuthenticatedContext } from "../../../AuthenticatedContext";
import classes from "../AuthPage.module.css";

interface Props {
  backButtonClickedHandler: () => void;
}
const validationSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "password is too short. Need at least 8 characters")
    .matches(/(?=.*[0-9])/, "Password must contain a number.")
    .matches(/(?=.*[a-z])/, "Password must contain one lower case letter")
    .matches(/(?=.*[A-Z])/, "Password must contain one UPPER case letter"),
});
const LoginPrompt: React.FC<Props> = (props) => {
  const [errorOnScreen, setErrorOnScreen] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(
    AuthenticatedContext
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
      {redirect ? (
        <div>
          {console.log(
            "IsAuthenticated in loginPrompt before redirect",
            isAuthenticated
          )}
          <Redirect to="/test" />
        </div>
      ) : (
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
            try {
              const resultSignin = await axios.post("/api/auth/signin", data);
              setIsAuthenticated(true);
              setRedirect(true);
              console.log(
                "Successfully sent a POST request to signin",
                resultSignin
              );
            } catch (e) {
              setErrorOnScreen("ERRORS occured while POST /api/auth/signin");
              console.log("ERRORS occured while POST /api/auth/signin", e);
            }
          }}
          validationSchema={validationSchema}
        >
          {({ values, isSubmitting, errors }) => (
            <Form>
              <InputField label="Email" name="email" type="input" />
              <div className={classes.InputFieldDiv}>
                <InputField label="Password" name="password" type="input" />
              </div>
              <p style={{ width: "300px" }}>{JSON.stringify(values)}</p>
              <div className={classes.Button}>
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
      )}

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
        {errorOnScreen}
      </div>
    </>
  );
};

export default LoginPrompt;
