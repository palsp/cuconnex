import React, { useState } from "react";
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
  const [redirect, setRedirect] = useState<any>();
  return (
    <>
      <div className={classes.divHeader}>
        <Heading value="Welcome Back!" data-test="auth-page-login-header" />
        <Subtitle
          value="Log in with your Chula account"
          data-test="auth-page-login-subtitle"
        />
      </div>
      <Formik
        data-test="auth-page-login-form"
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log(data);
          setSubmitting(false);
          setTimeout(() => {
            setRedirect(<Redirect to="selectinterests" />);
          }, 1500);
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
                onClick={() => {}}
                data-test="auth-page-login-button"
                value="Log in"
              />
            </div>
          </Form>
        )}
      </Formik>

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
        {redirect}
      </div>
    </>
  );
};

export default LoginPrompt;
