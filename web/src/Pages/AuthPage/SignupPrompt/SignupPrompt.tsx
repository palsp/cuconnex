import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Formik, Form } from "formik";
import axios from "axios";
import * as yup from "yup";

import {
  Button,
  DotMorePage,
  Heading,
  InputField,
  Subtitle,
} from "@dumbComponents/UI/index";

import { ArrowLeft } from "@icons/index";

import classes from "../AuthPage.module.css";
import { Input } from "@material-ui/core";

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
  const [redirect, setRedirect] = useState<any>();
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
      <Formik
        data-test="auth-page-signup-form"
        initialValues={{ email: "", id: "", password: "", confirmPassword: "" }}
        onSubmit={async (data, { setSubmitting }) => {
          console.log(data);
          setSubmitting(true);
          setTimeout(() => {
            setSubmitting(false);
            setRedirect(<Redirect to="/personalinformation" />);
          }, 1500);
          const resultSignup = await axios.post(
            "http://connex.dev/api/auth/signup",
            { email: data.email, id: data.id, password: data.password }
          );
          console.log(resultSignup);
        }}
        validationSchema={validationSchema}
      >
        {({ values, isSubmitting, errors }) => (
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
                onClick={() => {}}
              />
            </div>
            <p style={{ width: "300px" }}>{JSON.stringify(values.email)}</p>
            <p style={{ width: "300px" }}>{JSON.stringify(values.id)}</p>
            <p style={{ width: "300px" }}>{JSON.stringify(values.password)}</p>
            <p style={{ width: "300px" }}>
              {JSON.stringify(values.confirmPassword)}
            </p>
          </Form>
        )}
      </Formik>

      <div className={classes.footerNavigation}>
        {redirect}
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
