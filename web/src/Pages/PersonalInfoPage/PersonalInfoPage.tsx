import React from "react";
import { Link } from "react-router-dom";

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

const PersonalInfoPage: React.FC = () => {
  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <Background data-test="personal-info-background" />
        <HalfCircleOverlay data-test="personal-info-halfcircleoverlay" />
        <div className={classes.heading}>
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
          <ProfilePic data-test="personal-info-personalImage" />
        </div>
        <div className={classes.usernameDiv}>
          <Username data-test="personal-info-username" value="@micky_ngub" />
          <Edit />
        </div>
        <div className={classes.InputFieldDiv}>
          <InputField
            data-test="personal-info-setDisplayedName"
            value="Displayed Name"
          />
          <InputField data-test="personal-info-setFaculty" value="Faculty" />
          <InputField data-test="personal-info-setMajor" value="Major" />
          <InputField data-test="personal-info-setYear" value="Year of study" />
        </div>
        <Button value="Save" />
        <div className={classes.footerNavigation}>
          <Link to="/selectInterests">
            <div className={classes.footerIcon}>
              <ArrowLeft data-test="personal-info-arrowLeft" />
              <Heading value="Back" size="small" />
            </div>
          </Link>
          <DotMorePage data-test="personal-info-dotIcon" amount={3} />
          <Link to="/friendlists">
            <div className={classes.footerIcon}>
              <Heading value="Skip" size="small" />
              <ArrowRight data-test="personal-info-arrowRight" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;
