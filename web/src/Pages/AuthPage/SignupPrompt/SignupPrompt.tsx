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
import { IUserSignup, FacultyListsEnum } from "@models/index";
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

const yearFacultyHandler = (id: string) => {
  let studentYear: number | undefined = undefined;
  let studentFaculty: string | undefined = "";
  const enrolledYear = Number(id.substring(0, 2));
  const studentFacultyCode = id.substring(8);
  let currentYear: number = new Date().getFullYear();
  const currentMonth: number = new Date().getMonth();
  currentYear = currentYear + 543;
  currentYear = Number(currentYear.toString().substring(2));
  if (currentMonth > 7) {
    studentYear = currentYear - enrolledYear + 1;
  } else {
    studentYear = currentYear - enrolledYear;
  }
  if (studentFacultyCode === "21") {
    studentFaculty = FacultyListsEnum.Engineering;
  } else if (studentFacultyCode === "22") {
    studentFaculty = FacultyListsEnum.Arts;
  } else if (studentFacultyCode === "23") {
    studentFaculty = FacultyListsEnum.Science;
  } else if (studentFacultyCode === "24") {
    studentFaculty = FacultyListsEnum.PoliticalSciences;
  } else if (studentFacultyCode === "25") {
    studentFaculty = FacultyListsEnum.Architecture;
  } else if (studentFacultyCode === "26") {
    studentFaculty = FacultyListsEnum.CommerceAndAccountancy;
  } else if (studentFacultyCode === "27") {
    studentFaculty = FacultyListsEnum.Education;
  } else if (studentFacultyCode === "28") {
    studentFaculty = FacultyListsEnum.CommunicationArts;
  } else if (studentFacultyCode === "29") {
    studentFaculty = FacultyListsEnum.Economics;
  } else if (studentFacultyCode === "30") {
    studentFaculty = FacultyListsEnum.Medicine;
  } else if (studentFacultyCode === "31") {
    studentFaculty = FacultyListsEnum.VeterinaryScience;
  } else if (studentFacultyCode === "32") {
    studentFaculty = FacultyListsEnum.Dentistry;
  } else if (studentFacultyCode === "33") {
    studentFaculty = FacultyListsEnum.PharmaceuticalSciences;
  } else if (studentFacultyCode === "34") {
    studentFaculty = FacultyListsEnum.Law;
  } else if (studentFacultyCode === "35") {
    studentFaculty = FacultyListsEnum.FineAndAppliedArts;
  } else if (studentFacultyCode === "36") {
    studentFaculty = FacultyListsEnum.Nursing;
  } else if (studentFacultyCode === "37") {
    studentFaculty = FacultyListsEnum.AlliedHealthSciences;
  } else if (studentFacultyCode === "38") {
    studentFaculty = FacultyListsEnum.Psychology;
  } else if (studentFacultyCode === "39") {
    studentFaculty = FacultyListsEnum.SportsScience;
  } else if (studentFacultyCode === "40") {
    studentFaculty = FacultyListsEnum.AgriculturalResources;
  } else if (studentFacultyCode === "56") {
    studentFaculty = FacultyListsEnum.IntegratedInnovation;
  } else {
    studentFaculty = undefined;
  }

  return { studentFaculty, studentYear };
};

const SignupPrompt: React.FC<Props> = (props) => {
  const [redirect, setRedirect] = useState<JSX.Element>();
  const { setIsAuthenticated } = useContext(AuthenticatedContext);
  const { setErrorHandler } = useContext(ErrorContext);
  const signupHandler = async (signupData: IUserSignup) => {
    try {
      const resultSignup = await userSignupAPI(signupData);
      const resutlStatusCode = resultSignup.status;
      setIsAuthenticated(true);
      console.log("ResultStatusCode", resutlStatusCode);
      if (resutlStatusCode === 201) {
        console.log("SIGNUP SUCCESS...", resultSignup);
      }
      return resultSignup;
    } catch (e) {
      setErrorHandler(e.response.data.errors[0].message);
      console.log(
        "ERRORS occured while POST /api/auth/signup",
        e.response.data.errors[0].message
      );
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
          const result = await signupHandler(userSignupData);
          const resultData = result?.data;
          let faculty;
          let year;
          if (resultData) {
            faculty = resultData.faculty;
            year = resultData.year;
          }
          console.log("Result Signup..", result);
          resetForm();
          if (result) {
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
          }
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
