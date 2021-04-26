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

import { AuthenticatedContext } from "@hooks/AuthenticatedContext";
import { ErrorContext } from "@context/ErrorContext";
import { ArrowLeft } from "@icons/index";
import { userSignupAPI } from "@api/index";
import { IUserSignup } from "@models/index";
import classes from "@pages/AuthPage/AuthPage.module.css";

interface Props {
  backButtonClickedHandler: () => void;
}

const validationSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  id: yup
    .string()
    .required("ID is required")
    .length(10, "Please enter valid Chula ID")
    .matches(/^\d+$/, "Numbers only")
    .matches(/^[5-6][0-4|9]/, "Student ID should starts with 59-64")
    .matches(
      /([2-3][0-9]|01|02|40|51|53|55|56|58)$/,
      "Please enter valid Chula Faculty"
    ),
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
  const [redirect, setRedirect] = useState<JSX.Element>();
  const { setIsAuthenticated } = useContext(AuthenticatedContext);
  const { setErrorHandler } = useContext(ErrorContext);

  const signupHandler = async (signupData: IUserSignup) => {
    try {
      const resultSignup = await userSignupAPI(signupData);
      console.log("Successfully sent a POST request to signup", resultSignup);
      setIsAuthenticated(true);
      return resultSignup;
    } catch (e) {
      setErrorHandler(e);
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
      <Formik
        data-test="auth-page-signup-form"
        initialValues={{
          email: "",
          id: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          const userSignupData = {
            email: data.email,
            id: data.id,
            password: data.password,
          };
          setSubmitting(true);
          // const { studentYear, studentFaculty } = yearFacultyHandler(data.id);
          // console.log("Faculty: ", studentFaculty, "Year: ", studentYear);
          const result = await signupHandler(userSignupData);
          const resultData = result?.data;
          let faculty;
          let year;
          if (resultData) {
            faculty = resultData.faculty;
            year = resultData.year;
          }
          console.log("..result..", result);
          console.log("POST /api/auth/signup", data);
          resetForm();
          setRedirect(
            <Redirect
              to={{
                pathname: "/personalinformation",
                state: {
                  year: year,
                  faculty: faculty,
                  id: data.id,
                },
              }}
            />
          );
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, values }) => (
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
          </Form>
        )}
      </Formik>
      {redirect}
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
