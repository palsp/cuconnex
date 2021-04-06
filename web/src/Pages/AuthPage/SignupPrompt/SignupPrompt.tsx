import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";

import {
  Button,
  DotMorePage,
  Heading,
  InputField,
  Subtitle,
} from "@dumbComponents/UI/index";

import { AuthenticatedContext } from "@src/AuthenticatedContext";
import { ArrowLeft } from "@icons/index";
import { userSignupAPI } from "@src/api/";
import { IUserSignup } from "@src/models";
import classes from "../AuthPage.module.css";

interface Props {
  backButtonClickedHandler: () => void;
}

const validationSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  id: yup
    .string()
    .required("ID is required")
    .length(10, "Please enter valid Chula ID")
    .matches(/^\d+$/, "Numbers only"),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "password is too short. Need at least 8 characters")
    .matches(/(?=.*[0-9])/, "Password must contain a number.")
    .matches(/(?=.*[a-z])/, "Password must contain one lower case letter")
    .matches(/(?=.*[A-Z])/, "Password must contain one UPPER case letter"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignupPrompt: React.FC<Props> = (props) => {
  const [errorOnScreen, setErrorOnScreen] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(
    AuthenticatedContext
  );

  const signupHandler = async (userData: IUserSignup) => {
    try {
      const resultSignup = await userSignupAPI(userData);
      console.log("Successfully sent a POST request to signup", resultSignup);
      setIsAuthenticated(true);
      setRedirect(true);
      // const resultSignup = await axios.post("/api/auth/signup", {

      // });
    } catch (e) {
      setErrorOnScreen("ERRORS occured while POST /api/auth/signup");
      console.log("ERRORS occured while POST /api/auth/signup", e);
    }
  };
  return (
    <>
      <div className={classes.divHeader}>
        <Heading value="Welcome" data-test="auth-page-signup-header" />
        <div className={classes.divHeaderSubtitle}>
          <Subtitle
            value="Let's find your right team in Chula"
            data-test="auth-page-signup-subtitle"
          />
        </div>
      </div>

      {redirect ? (
        <div>
          {console.log(
            "IsAuthenticated in signupPrompt before redirect",
            isAuthenticated
          )}
          <Redirect to="/personalinformation" />
        </div>
      ) : (
        <Formik
          data-test="auth-page-signup-form"
          initialValues={{
            email: "",
            id: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            const userSignupData = {
              email: data.email,
              id: data.id,
              password: data.password,
            };
            signupHandler(userSignupData);
            console.log("POST /api/auth/signup", data);
            setSubmitting(true);
            resetForm();
          }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField label="Email" name="email" type="input" />
              <div className={classes.InputFieldDiv}>
                <InputField label="Student ID" name="id" type="input" />
              </div>
              <div className={classes.InputFieldDiv}>
                <InputField label="Password" name="password" type="password" />
              </div>
              <div className={classes.InputFieldDiv}>
                <InputField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                />
              </div>
              <div className={classes.Button}>
                <Button
                  data-test="auth-page-signup-next-button"
                  value="Next"
                  disabled={isSubmitting}
                  type="submit"
                />
              </div>
              {/* <p style={{ width: "300px" }}>{JSON.stringify(values.email)}</p>
              <p style={{ width: "300px" }}>{JSON.stringify(values.id)}</p>
              <p style={{ width: "300px" }}>
                {JSON.stringify(values.password)}
              </p>
              <p style={{ width: "300px" }}>
                {JSON.stringify(values.confirmPassword)}
              </p> */}
            </Form>
          )}
        </Formik>
      )}
      {errorOnScreen}
      <div className={classes.footerNavigation}>
        <DotMorePage data-test="dot-icon" amount={1} />
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

export default SignupPrompt;
