import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { FormControl, TextField } from "@material-ui/core/";
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
import classes from "./PersonalInfoPage.module.css";
import { motion } from "framer-motion";
import defaultProfilePic from "@assets/defaultProfilePic.png";
import tempProfilePicture from "@assets/tempProfilePic.jpg";

interface Props {
  location: {
    state: {
      year: number;
      faculty: string;
      id: string;
    };
  };
}

const validationSchema = yup.object({
  displayName: yup.string().required("Display name is required"),
  bio: yup.string().required("Please fill in your bio"),
  role: yup.string().required("Please fill in your role"),
});

const PersonalInfoPage: React.FC<Props> = (props) => {
  const [redirect, setRedirect] = useState<JSX.Element>();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageRaw, setImageRaw] = useState<File>();

  const handleUploadedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("e.target.files: ", e.target.files);
    if (e.target.files?.length) {
      // console.log("Initial image raw: ", imageRaw);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      setImageRaw(e.target.files[0]);
    }
  };

  const handleInitialImage = () => {
    const fileName = "myFile.png";
    fetch(defaultProfilePic).then(async (response) => {
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: "image/png" });
      // setImagePreview(URL.createObjectURL(blob));
      setImageRaw(file);
    });
    fetch(tempProfilePicture).then(async (response) => {
      const blob = await response.blob();
      setImagePreview(URL.createObjectURL(blob));
    });
  };

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes.background}>
          <Background hasNav={false} data-test="personal-info-background">
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
                          size="xl"
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

                {props.location?.state && (
                  <>
                    <div className={classes.idYearFaculty}>
                      {props.location.state.id}
                    </div>
                    <div className={classes.idYearFaculty}>
                      Faculty of {props.location.state.faculty}, Year{" "}
                      {props.location.state.year}
                    </div>
                  </>
                )}

                <Formik
                  data-test="personal-info-form"
                  initialValues={{ displayName: "", bio: "", role: "" }}
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
                              bio: data.bio,
                              role: data.role,
                              profilePic: imageRaw,
                              year: props.location.state.year.toString(10),
                              faculty: props.location.state.faculty,
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
                      <div className={classes.inputFieldDiv}>
                        <InputField
                          label="Role*"
                          type="input"
                          name="role"
                          placeholder="Developer, Business Analyst, etc."
                        />
                      </div>

                      <div className={classes.selectDiv}>
                        <FormControl style={{ width: "100%" }}>
                          {/* <InputLabel>Faculty</InputLabel>
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
                          </Field> */}
                          <Field
                            label="Bio"
                            type="input"
                            name="bio"
                            multiline
                            rowsMax={4}
                            variant="outlined"
                            as={TextField}
                          />
                        </FormControl>
                      </div>
                      <div className={classes.Button}>
                        <Button value="Save" />
                      </div>
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
