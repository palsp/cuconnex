import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core/";

import {
  Background,
  Button,
  DotMorePage,
  HalfCircleOverlay,
  Heading,
  InputField,
  ProfilePic,
  Subtitle,
  Username,
} from "@dumbComponents/UI/index";

import { ArrowLeft, ArrowRight, Edit } from "@icons/index";

import classes from "./PersonalInfoPage.module.css";
import { motion } from "framer-motion";

const facultyArray = [
  "Allied Health Sciences",
  "Architecture",
  "Arts",
  "Communication Arts",
  "Commerce and Accountancy",
  "Dentistry",
  "Economics",
  "Education",
  "Engineering",
  "Fine and Applied Arts",
  "Law",
  "Medicine",
  "Nursing",
  "Pharmaceutical Sciences",
  "Political Sciences",
  "Psychology",
  "Science",
  "Sports Science",
  "VeterinaryScience",
  "Integrated Innovation",
  "Agricultural Resources",
];
const PersonalInfoPage: React.FC = () => {
  const [redirect, setRedirect] = useState<any>();

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes.background}>
          <Background data-test="personal-info-background">
            <div className={classes.content}>
              <motion.div className={classes.motion}>
                <div className={classes.titleDiv}>
                  <Heading
                    data-test="personal-info-header"
                    value="Personal Information"
                  />
                </div>

                <div className={classes.subtitleDiv}>
                  <Subtitle
                    data-test="personal-info-subtitle"
                    value="Setting up your profile"
                  />
                </div>
                <div className={classes.profilePicDiv}>
                  <ProfilePic
                    size="big"
                    data-test="personal-info-personalImage"
                  />
                </div>
                {/* <div className={classes.usernameDiv}>
                  <Username
                    data-test="personal-info-username"
                    value="@micky_ngub"
                  />
                  <Edit />
                </div> */}
                <Formik
                  data-test="personal-info-form"
                  initialValues={{ displayName: "", faculty: "" }}
                  onSubmit={(data, { setSubmitting }) => {
                    console.log(data);
                    setSubmitting(true);
                    setTimeout(() => {
                      setSubmitting(false);
                    }, 500);
                    setTimeout(() => {
                      setRedirect(
                        <Redirect
                          to={{
                            pathname: "/selectinterests",
                            state: {
                              username: data.displayName,
                            },
                          }}
                        />
                      );
                    }, 1500);
                  }}
                >
                  {({ values, isSubmitting }) => (
                    <Form>
                      <div className={classes.inputFieldDiv}>
                        <InputField
                          label="Display Name*"
                          type="input"
                          name="displayName"
                        />
                      </div>
                      <div className={classes.selectDiv}>
                        <FormControl style={{ width: "100%" }}>
                          <InputLabel>Faculty</InputLabel>
                          <Field
                            name="faculty"
                            type="select"
                            label="Faculty"
                            as={Select}
                          >
                            {facultyArray.map((faculty) => (
                              <MenuItem value={faculty}>{faculty}</MenuItem>
                            ))}
                          </Field>
                        </FormControl>
                      </div>
                      <div className={classes.Button}>
                        <Button value="Save" />
                      </div>
                      <p style={{ width: "300px" }}>{JSON.stringify(values)}</p>
                    </Form>
                  )}
                </Formik>
                {/* <div className={classes.InputFieldDiv}>
                  <InputField
                    data-test="personal-info-setDisplayedName"
                    value="Displayed Name" />
                  <InputField 
                    data-test="personal-info-setFaculty" 
                    value="Faculty" />
                  <InputField data-test="personal-info-setMajor" 
                    value="Major" />
                  <InputField data-test="personal-info-setYear" 
                    value="Year of study" />
                </div> */}

                <div className={classes.footerNavigation}>
                  <DotMorePage data-test="personal-info-dotIcon" amount={2} />
                  <Link
                    to={{
                      pathname: "/selectinterests",
                      state: { username: "" },
                    }}
                  >
                    <div className={classes.footerIcon}>
                      <Heading value="Skip" size="small" />
                      <ArrowRight data-test="personal-info-arrowRight" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            </div>
            {redirect}
          </Background>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;
