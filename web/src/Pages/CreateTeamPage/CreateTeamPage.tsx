import { Button, InputField } from "@dumbComponents/UI";
import { ArrowLeft } from "@dumbComponents/UI/Icons";
import MemberTags from "@smartComponents/MemberTag/MemberTags";
import ProfilePic from "@smartComponents/ProfilePic/ProfilePic";
import { createTeamAPI } from "@src/api";
import mockMemberTagData from "@src/mockData/mockMemberTagData";
import { ITeamData } from "@src/models";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import classes from "./CreateTeamPage.module.css";

const CreateTeamPage: React.FC = () => {
  const [errorOnScreen, setErrorOnScreen] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  const createTeamHandler = async (teamData: ITeamData) => {
    try {
      const resultTeam = await createTeamAPI(teamData);
      console.log("Successfully sent a POST request to teams", resultTeam);
      setRedirect(true);
    } catch (e) {
      setErrorOnScreen("ERRORS occured while POST /api/teams/");
      console.log("ERRORS occured while POST /api/teams/", e);
    }
  };

  const PageHero = (
    <div>
      {redirect ? (
        <div>
          <Redirect to="/" />
        </div>
      ) : (
        <Formik
          initialValues={{
            name: "",
            description: "",
          }}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            const teamCreateData = {
              name: data.name,
              description: data.description,
            };
            createTeamHandler(teamCreateData);
            console.log("POST /api/events/", data);
            setSubmitting(true);
            resetForm();
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <div className={classes.pageHeaderDiv}>
                <div className={classes.arrowDiv}>
                  <ArrowLeft />
                </div>
                <div className={classes.newTeamDiv}>New team</div>
                <div>
                  <button
                    className={classes.createDiv}
                    value="Next"
                    type="submit"
                  >
                    Create
                  </button>
                </div>
              </div>
              <div className={classes.profilePicDiv}>
                <ProfilePic size="medium"></ProfilePic>
              </div>
              <div className={classes.InputFieldDiv}>
                <InputField label="Team name" name="name" type="input" />
              </div>
              <div className={classes.InputFieldDiv}>
                <InputField
                  label="Team description"
                  name="description"
                  type="input"
                />
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
  const MemberTag = (
      <Link style={{ textDecoration: "none"}} to="/selectmember">
        <div className={classes.backgroundDiv}>
          <div className={classes.memberTagDiv}>
            <MemberTags members={mockMemberTagData}></MemberTags>
          </div>
        </div>
      </Link>
  );
  return (
    <div>
      {PageHero}
      <div className={classes.deleteUnderlineDiv}>
      {MemberTag}
      </div>
    </div>
  );
};

export default CreateTeamPage;
