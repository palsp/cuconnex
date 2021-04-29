import { Button, InputField } from "@dumbComponents/UI";
import { ArrowLeft } from "@dumbComponents/UI/Icons";
import MemberTags from "@smartComponents/MemberTag/MemberTags";
import ProfilePic from "@smartComponents/ProfilePic/ProfilePic";
import { createTeamAPI, teamInvitationAPI } from "@src/api";
import { mockMemberLists } from "@src/mockData";
import { UsersData } from "@src/mockData/Models";
import { IInviteData, ITeamData, IUser, IUserFriend } from "@src/models";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import SelectMemberPrompt from "../SelectMemberPrompt/SelectMemberPrompt";
import classes from "./CreateTeamPrompt.module.css";
import { ErrorContext } from "@context/ErrorContext";
interface Props {
  members: IUserFriend[] | [];
}
const CreateTeamPrompt: React.FC<Props> = (props) => {
  const [clickSelectMember, setClickSelectMember] = useState<boolean>(false);
  const [clickCreateTeam, setClickCreateTeam] = useState<boolean>(true);
  const [redirect, setRedirect] = useState<boolean>(false);
  const backClickedHandler = () => {
    setClickSelectMember(true);
    setClickCreateTeam(false);
  };
  const { setErrorHandler } = useContext(ErrorContext);
  const createTeamHandler = async (teamData: ITeamData) => {
    const resultTeam = await createTeamAPI(teamData);
    console.log("Successfully sent a POST request to teams", resultTeam);
    console.log("Hello" + { resultTeam });
  };
  const invitationHandler = async (inviteData: IInviteData) => {
    try {
      const resultInvitation = await teamInvitationAPI(inviteData);
      console.log(
        "Hi, Successfully sent a POST request to /api/teams/invite-member",

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
              <button className={classes.createDiv} value="Next" type="submit">
                Create
              </button>
            </div>
          </div>
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

              setTimeout(
                () => inviteMember(teamCreateData.name, props.members),
                1000
              );
              console.log("POST /api/teams/", data);
              setSubmitting(true);
              resetForm();
            }}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <div className={classes.profilePicDiv}>
                  <ProfilePic size="big"></ProfilePic>
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
      <SelectMemberPrompt />
    ) : (
      <div>error</div>
    );

  return <motion.div>{createPrompt}</motion.div>;
};

export default CreateTeamPrompt;
