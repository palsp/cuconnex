import React, { useState } from "react";
import classes from "./EditPrompt.module.css";
import { Link, Redirect } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core/";
import * as yup from "yup";

import { InputField, Toggles } from "@dumbComponents/UI/index";

import { ProfilePic } from "@smartComponents/index";

interface Props {
  type?: boolean; // true == 'Profile', false = 'About'
}

const EditPrompt: React.FC<Props> = (props) => {
  const [redirect, setRedirect] = useState<any>();

  let prompt = null;
  if (props.type === true) {
    prompt = (
      <div className={classes.edit}>
        <div className={classes.profilePicDiv}>
          <ProfilePic size="big" data-test="personal-info-personalImage" />
        </div>
        <div className={classes.toggle}>
          <div className={classes.toggleText}>Looking for a team</div>
          <div className={classes.toggleBtn}>
            <Toggles />
          </div>
        </div>

        <Formik
          data-test="edit-profile-form"
          initialValues={{ displayName: "", currentPosition: "" }}
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
                    pathname: "/profile",
                    state: {
                      name: data.displayName,
                      currentPosition: data.currentPosition,
                    },
                  }}
                />
              );
            }, 1500);
          }}
        >
          {({ values, handleSubmit }) => (
            <Form>
              <div className={classes.input}>
                <div className={classes.inputFieldDiv}>
                  <InputField
                    label="Display Name*"
                    type="input"
                    name="displayName"
                  />
                </div>
                <div className={classes.roleFieldDiv}>
                  <InputField
                    label="Current Position*"
                    type="input"
                    name="currentPosition"
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  } else {
    prompt = (
      <div className={classes.edit}>
        <Formik
          data-test="edit-about-form"
          initialValues={{ about: "" }}
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
                    pathname: "/profile",
                    state: {
                      about: data.about,
                    },
                  }}
                />
              );
            }, 1500);
          }}
        >
          {({ values, handleSubmit }) => (
            <Form>
              <div className={classes.input}>
                <div className={classes.inputFieldDiv}>
                  <InputField
                    label="Tell Something About You*"
                    type="input"
                    name="about"
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
  return <div className={classes.editPrompt}>{prompt}</div>;
};

export default EditPrompt;
