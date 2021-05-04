import React, { useState, useContext } from "react";
import * as yup from "yup";
import { Button, InputField } from "@dumbComponents/UI";
import { ArrowLeft } from "@dumbComponents/UI/Icons";
import MemberTags from "@smartComponents/MemberTag/MemberTags";
import ProfilePic from "@smartComponents/ProfilePic/ProfilePic";
import {
  createTeamAPI,
  registerTeamEventAPI,
  teamInvitationAPI,
} from "@src/api";
import { mockMemberLists } from "@src/mockData";
import { UsersData } from "@src/mockData/Models";
import {
  IInviteData,
  IRegisterTeamEvent,
  ICreateTeamData,
  IUser,
  IUserFriend,
} from "@src/models";
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { Link, Redirect } from "react-router-dom";
import SelectMemberPrompt from "../SelectMemberPrompt/SelectMemberPrompt";
import classes from "./CreateTeamPrompt.module.css";
import { ErrorContext } from "@context/ErrorContext";
import defaultProfilePic from "@assets/defaultProfilePic.png";
import { TextField } from "@material-ui/core";
import { IEventData } from "@models/index";
interface Props {
  members: IUserFriend[] | [];
  event?: IEventData;
}

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Team name is requried")
    .matches(/^[A-Za-z0-9]+$/, "Only characters and numbers allow"),
  description: yup
    .string()
    .required("Team description is requried")
    .matches(/^[A-Za-z0-9]+$/, "Only characters and numbers allow"),
  currentRecruitment: yup
    .string()
    .required("Please tell us who you are looking for")
    .matches(/^[A-Za-z0-9]+$/, "Only characters and numbers allow"),
});
const CreateTeamPrompt: React.FC<Props> = (props) => {
  const [clickSelectMember, setClickSelectMember] = useState<boolean>(false);
  const [clickCreateTeam, setClickCreateTeam] = useState<boolean>(true);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageRaw, setImageRaw] = useState<File>();

  const { setErrorHandler } = useContext(ErrorContext);

  const handleUploadedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      setImageRaw(e.target.files[0]);
    }
  };
  const handleInitialImage = () => {
    const fileName = "myFile.png";
    fetch(defaultProfilePic).then(async (response) => {
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: "image/png" });
      setImagePreview(URL.createObjectURL(blob));
      setImageRaw(file);
    });
  };
  const backClickedHandler = () => {
    setClickSelectMember(true);
    setClickCreateTeam(false);
  };
  const createTeamHandler = async (teamData: ICreateTeamData) => {
    try {
      const resultTeam = await createTeamAPI(teamData);
      console.log("Successfully sent a POST request to teams", resultTeam);
    } catch (e) {
      setErrorHandler(e.response.data.errors[0].message);
    }
  };
  const registerEventHandler = async (eventTeamData: IRegisterTeamEvent) => {
    try {
      const registerTeam = await registerTeamEventAPI(eventTeamData);
      console.log(
        "Register team to event =",
        props.event?.["event-name"],
        "Succesfully",
        registerTeam
      );
    } catch (e) {
      setErrorHandler(e.resonse.data.errors[0].message);
    }
  };
  const invitationHandler = async (inviteData: IInviteData) => {
    try {
      const resultInvitation = await teamInvitationAPI(inviteData);
      console.log(
        "Successful POST request to /api/teams/invite-member",
        resultInvitation
      );
      setRedirect(true);
    } catch (e) {
      setErrorHandler(e.response.data.errors[0].message);
      console.log("ERRORS occured while POST /api/teams/invite-member", e);
    }
  };
  const inviteMember = (teamNames: string, members: IUserFriend[] | []) => {
    members.forEach((members) => {
      invitationHandler({ teamName: teamNames, newMemberId: members.id });
      console.log("POST /members/invite/", teamNames, members.id);
    });
  };
  const PageHero = (
    <div>
      {redirect ? (
        <div>
          <Redirect to="/" />
        </div>
      ) : (
        <>
          <div className={classes.pageHeaderDiv}>
            <div onClick={backClickedHandler} className={classes.arrowDiv}>
              <ArrowLeft />
            </div>
            <div className={classes.newTeamDiv}>New team</div>
            <div>
              <label className={classes.createDiv} htmlFor="create-button">
                Create
              </label>
            </div>
          </div>

          <div className={classes.profilePicDiv}>
            <label htmlFor="upload-button">
              {imagePreview !== "" ? (
                <ProfilePic
                  size="xl"
                  PicUrl={imagePreview}
                  previewImage={true}
                />
              ) : (
                <>{handleInitialImage()}</>
              )}
            </label>
            <input
              type="file"
              id="upload-button"
              accept="image/*"
              name="myFile"
              style={{ display: "none" }}
              onChange={handleUploadedImage}
            />
          </div>
          <Formik
            initialValues={{
              name: "",
              description: "",
              currentRecruitment: "",
            }}
            onSubmit={async (data, { setSubmitting, resetForm }) => {
              let thisEventId = 0;
              if (props.event) {
                thisEventId = props.event.id;
              }
              const teamCreateData = {
                name: data.name,
                description: data.description,
                currentRecruitment: data.currentRecruitment,
                image: imageRaw,
              };
              const registerEventData = {
                teamName: data.name,
                eventId: thisEventId,
              };
              console.log(
                "teamCreateData...",
                teamCreateData,
                "registerEventData...",
                registerEventData
              );
              await createTeamHandler(teamCreateData);
              await registerEventHandler(registerEventData);
              setTimeout(
                () => inviteMember(teamCreateData.name, props.members),
                1000
              );
              setSubmitting(true);
              resetForm();
            }}
            validationSchema={validationSchema}
          >
            {({ isSubmitting, values }) => (
              <Form>
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
                <div className={classes.InputFieldDiv}>
                  <Field
                    style={{ width: "100%", marginTop: "10px" }}
                    label="Current Recruitment"
                    type="input"
                    name="currentRecruitment"
                    multiline
                    rowsMax={2}
                    variant="outlined"
                    as={TextField}
                  />
                </div>
                <button
                  id="create-button"
                  style={{ display: "none" }}
                  type="submit"
                ></button>
              </Form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
  const MemberTag = (
    <Link style={{ textDecoration: "none" }} to="/selectmember">
      <div className={classes.backgroundDiv}>
        <div className={classes.memberTagDiv}>
          <MemberTags members={props.members}></MemberTags>
        </div>
      </div>
    </Link>
  );
  const createPrompt =
    clickCreateTeam === true ? (
      <div>
        {PageHero}
        <div className={classes.deleteUnderlineDiv}>{MemberTag}</div>
      </div>
    ) : clickSelectMember === true ? (
      <SelectMemberPrompt event={props.event} />
    ) : (
      <div>error</div>
    );

  return <motion.div>{createPrompt}</motion.div>;
};

export default CreateTeamPrompt;
