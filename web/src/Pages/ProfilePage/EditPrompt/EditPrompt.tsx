import React, { useState } from "react";
import classes from "./EditPrompt.module.css";
import { Link, Redirect } from "react-router-dom";
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
  Toggles,
} from "@dumbComponents/UI/index";

import { ProfilePic } from "@smartComponents/index";

const EditPrompt: React.FC = () => {
  const [redirect, setRedirect] = useState<any>();
  return (
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
};

export default EditPrompt;
