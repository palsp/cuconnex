import React from "react";
import { Link } from "react-router-dom";
import Background from "../../components/dumbComponents/UI/Background/Background";
import Button from "../../components/dumbComponents/UI/Button/Button";
import DotMorePage from "../../components/dumbComponents/UI/DotMorePage/DotMorePage";
import HalfCircleOverlay from "../../components/dumbComponents/UI/HalfCircleOverlay/HalfCircleOverlay";
import Heading from "../../components/dumbComponents/UI/Heading/Heading";
import ArrowLeft from "../../components/dumbComponents/UI/Icons/ArrowLeft/ArrowLeft";
import ArrowRight from "../../components/dumbComponents/UI/Icons/ArrowRight/ArrowRight";
import Edit from "../../components/dumbComponents/UI/Icons/Edit/Edit";
import InputField from "../../components/dumbComponents/UI/InputField/InputField";
import ProfilePic from "../../components/dumbComponents/UI/ProfilePic/ProfilePic";
import Subtitle from "../../components/dumbComponents/UI/Subtitle/Subtitle";
import Username from "../../components/dumbComponents/UI/Username/Username";
import classes from "./PersonalInfoPage.module.css";
import { motion } from 'framer-motion'; 

const PersonalInfoPage: React.FC = () => {
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
                <div className={classes.profilePicDiv}>
                  <ProfilePic data-test="personal-info-personalImage" />
                </div>
                <div className={classes.usernameDiv}>
                  <Username 
                    data-test="personal-info-username" 
                    value="@micky_ngub" />
                  <Edit />
                </div>
                <div className={classes.InputFieldDiv}>
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
                </div>
                <div className={classes.Button}>
                  <Button value="Save" />
                </div>
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

              </motion.div>
            </div>
          </Background>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;