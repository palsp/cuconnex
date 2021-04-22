import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core/";
import * as yup from "yup";

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
import { FacultyListsEnum } from "@models/index";
import defaultProfilePic from "@assets/tempProfilePic.png";

const facultyArray: string[] = Object.values(FacultyListsEnum);

// const facultyArray = [
//   "Allied Health Sciences",
//   "Architecture",
//   "Arts",
//   "Communication Arts",
//   "Commerce and Accountancy",
//   "Dentistry",
//   "Economics",
//   "Education",
//   "Engineering",
//   "Fine and Applied Arts",
//   "Law",
//   "Medicine",
//   "Nursing",
//   "Pharmaceutical Sciences",
//   "Political Sciences",
//   "Psychology",
//   "Science",
//   "Sports Science",
//   "VeterinaryScience",
//   "Integrated Innovation",
//   "Agricultural Resources",
// ];

interface Props {
  location: {
    state: {
      year: number;
      faculty: FacultyListsEnum;
    };
  };
}

const validationSchema = yup.object({
  displayName: yup.string().required("Display name is required"),
});

const PersonalInfoPage: React.FC<Props> = (props) => {
  const [redirect, setRedirect] = useState<JSX.Element>();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageRaw, setImageRaw] = useState<File>();

  const handleUploadedImage = (e: any) => {
    // console.log("e.target.files: ", e.target.files);
    if (e.target.files.length) {
      // console.log("Initial image raw: ", imageRaw);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      setImageRaw(e.target.files[0]);
    }
  };

  const handleInitialImage = () => {
    const fileName = "myFile.jpg";
    fetch(defaultProfilePic).then(async (response) => {
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: "image/*" });
      setImagePreview(URL.createObjectURL(blob));
      setImageRaw(file);
    });
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
                  onChange={() => console.log("Image raw: ", imageRaw)}
                >
                  <label htmlFor="upload-button">
                    {imagePreview !== "" ? (
                      <>
                        <ProfilePic
                          size="big"
                          data-test="personal-info-personalImage"
                          PicUrl={imagePreview}
                          previewImage={true}
                        />
                      </>
                    ) : (
                      <>
                        {handleInitialImage()}
                        {/* <ProfilePic
                          size="big"
                          data-test="personal-info-personalImage"
                        /> */}
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="myFile"
                    id="upload-button"
                    style={{ display: "none" }}
                    onChange={handleUploadedImage}
                  />
                </div>
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
                              // profilePic: image ? image.raw : null,
                              profilePic: imageRaw,
                            },
                          }}
                        />
                      );
                    }, 1500);
                  }}
                  validationSchema={validationSchema}
                >
                  {({ values }) => (
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
                          <div className={classes.emptyDiv}></div>
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
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
