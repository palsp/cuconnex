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

  let studentYear: number | undefined = undefined;
  let studentFaculty: FacultyListsEnum | undefined = undefined;

  const signupHandler = async (signupData: IUserSignup) => {
    try {
      const resultSignup = await userSignupAPI(signupData);
      console.log("Successfully sent a POST request to signup", resultSignup);
      setIsAuthenticated(true);
      setRedirect(true);
    } catch (e) {
      setErrorOnScreen("ERRORS occured while POST /api/auth/signup");
      console.log("ERRORS occured while POST /api/auth/signup", e);
    }
  };

  const yearFacultyHandler = (id: string) => {
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
    console.log("Faculty: ", studentFaculty);
    console.log("Year: ", studentYear);
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
          <Redirect
            to={{
              pathname: "/personalinformation",
              state: {
                year: studentYear,
                faculty: studentFaculty,
              },
            }}
          />
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
          onSubmit={async (data, { setSubmitting, resetForm }) => {
            const userSignupData = {
              email: data.email,
              id: data.id,
              password: data.password,
            };
            setSubmitting(true);
            yearFacultyHandler(data.id);
            await signupHandler(userSignupData);
            console.log("POST /api/auth/signup", data);
            resetForm();
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
