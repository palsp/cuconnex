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

const validationSchema = yup.object({
  displayName: yup.string().required("Display name is required"),
});

const PersonalInfoPage: React.FC = () => {
  const [redirect, setRedirect] = useState<JSX.Element>();

  const [image, setImage] = useState({ preview: "", raw: File });

  const handleUploadedImage = (e: any) => {
    console.log("e.target.files: ", e.target.files);
    if (e.target.files.length) {
      console.log("Initial image raw: ", image.raw);
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  // const componentDidMount = () => {};
  // const handleDefaultImage = (e: any) => {
  //   setImage((currentState) => ({
  //     ...currentState,
  //     raw: e,
  //   }));
  //   console.log("what happen");
  // };

  const defaultPic =
    "/Users/clm/Documents/GitHub/cuconnex/web/src/Pages/PersonalInfoPage/blank-profile-picture-973460_1280.png";

  const handleInitialImage = () => {
    // const url =
    //   "https://cdn.shopify.com/s/files/1/0234/8017/2591/products/young-man-in-bright-fashion_925x_f7029e2b-80f0-4a40-a87b-834b9a283c39.jpg?v=1572867553";
    const url = "./blank-profile-picture-973460_1280.png";
    const fileName = "myFile.jpg";
    fetch(defaultProfilePic).then(async (response) => {
      console.log(response.type);
      // const contentType = response.headers.get("content-type");
      const blob = await response.blob();
      console.log(blob);
      console.log(URL.createObjectURL(blob));
      // const file = new File([blob], fileName, { contentType });
      const file = new File([blob], fileName, { type: "image/*" });
      console.log("what is this: ", file);
      // handleUploadedImage(file);
      // setImage({
      //   preview: URL.createObjectURL(file),
      //   raw: file,
      // });
      setImage((prevState) => ({
        ...prevState,
        preview: URL.createObjectURL(file),
      }));
      // access file here
      // handleUploadedImage(file);
    });
  };

  // const ha = new File(defaultPic, "defaultPic");
  // console.log("Before----------------------");
  // handleDefaultImage(defaultPic);
  // console.log("After----------------------");

  // const componentDidMount = () => {
  //   console.log("hello");
  // };

  // const handleNonUploadImage = () => {
  //   handleUploadedImage();
  // };

  return (
    <div className={classes.background}>
      <Background data-test="personal-info-background">
        <div className={classes.content}>
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
              {image.preview !== "" ? (
                <>
                  <ProfilePic
                    size="medium"
                    data-test="personal-info-personalImage"
                    PicUrl={image.preview}
                    uploadedProfile={true}
                  />
                <div
                  className={classes.profilePicDiv}
                  onChange={() => console.log("Image raw: ", image.raw)}
                >
                  <label htmlFor="upload-button">
                    {image.preview !== "" ? (
                      <>
                        <ProfilePic
                          size="big"
                          data-test="personal-info-personalImage"
                          PicUrl={image.preview}
                          uploadedProfile={true}
                        />
                      </>
                    ) : (
                      <>
                        {handleInitialImage()}
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
                    name="myFile"
                    id="upload-button"
                    style={{ display: "none" }}
                    onChange={handleUploadedImage}

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

                <Formik
                  data-test="personal-info-form"
                  initialValues={{ displayName: "", faculty: "" }}
                  onSubmit={(data, { setSubmitting }) => {
                    // if (image.raw != File) {
                    //   console.log("setting up image");
                    //   handleInitialImage();
                    // }
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
                              ProfilePic: image.raw,
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
                    <div className={classes.footerIcon}>
                      <Heading value="Skip" size="small" />
                      <ArrowRight data-test="personal-info-arrowRight" />
                    </div>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        {redirect}
      </Background>
    </div>
  );
};

export default PersonalInfoPage;
