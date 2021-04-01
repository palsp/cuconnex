import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core/";
import * as yup from "yup";

import { ProfilePic } from "@smartComponents/index";
import {
  Background,
  Button,
  DotMorePage,
  Heading,
  InputField,
  Subtitle,
} from "@dumbComponents/UI/index";

import { ProfilePic } from "@smartComponents/index";
import { ArrowRight } from "@icons/index";

import classes from "./PersonalInfoPage.module.css";
import { motion } from "framer-motion";
import { convertCompilerOptionsFromJson } from "typescript";

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

const validationSchema = yup.object({
  displayName: yup.string().required("Display name is required"),
});

const PersonalInfoPage: React.FC = () => {
  const [redirect, setRedirect] = useState<any>();

  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = (e: any) => {
    console.log(e.target.files);
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

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
                <div
                  className={classes.profilePicDiv}
                  onChange={() => console.log(image.preview)}
                >
                  <label htmlFor="upload-button">
                    {/* <ProfilePic
                      size="big"
                      uploadedProfile={true}
                      data-test="personal-info-personalImage"
                    /> */}
                    {image.preview !== "" ? (
                      <>
                        {/* <img
                          src={image.preview}
                          alt="dummy"
                          style={{
                            width: "300px",
                            height: "300px",
                            borderRadius: "50%",
                          }}
                        /> */}
                        <div
                          style={{
                            width: "300px",
                            height: "300px",
                            borderRadius: "50%",
                          }}
                        >
                          <ProfilePic
                            size="big"
                            data-test="personal-info-personalImage"
                            PicUrl={image.preview}
                            uploadedProfile={true}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <h1>else case</h1>
                        <ProfilePic
                          size="big"
                          data-test="personal-info-personalImage"
                        />
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="upload-button"
                    style={{ display: "none" }}
                    onChange={handleChange}
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
                    console.log("Data from PersonalInformationPage", data);
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
                              name: data.displayName,
                              faculty: data.faculty,
                            },
                          }}
                        />
                      );
                    }, 1500);
                  }}
                  validationSchema={validationSchema}
                >
                  {({ values, handleSubmit }) => (
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
                              <MenuItem key={faculty} value={faculty}>
                                {faculty}
                              </MenuItem>
                            ))}
                          </Field>
                        </FormControl>
                      </div>
                      <div className={classes.Button}>
                        <Button value="Save" />
                      </div>
                      <p style={{ width: "300px" }}>{JSON.stringify(values)}</p>
                      <div className={classes.footerNavigation}>
                        {/*  This div is for centering footer navigation*/}
                        <div style={{ width: "80px" }}></div>
                        <DotMorePage
                          data-test="personal-info-dotIcon"
                          amount={2}
                        />

                        <button type="submit" className={classes.noStyleButton}>
                          <div className={classes.footerIcon}>
                            <Heading value="Skip" size="small" />
                            <ArrowRight data-test="personal-info-arrowRight" />
                          </div>
                        </button>
                      </div>
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
