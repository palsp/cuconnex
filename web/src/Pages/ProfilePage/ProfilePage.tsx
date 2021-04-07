import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import {
  AppLogo,
  Logo,
  Background,
  Button,
  Subtitle,
  Heading,
  ProfilePic,
  RecruitSign,
  PicWithText,
  CoverPic,
} from "@dumbComponents/UI/index";
import { ArrowLeft, Edit, PlusCircle } from "@icons/index";
import EditPrompt from "./EditPrompt/EditPrompt";

import classes from "./ProfilePage.module.css";
import { Redirect } from "react-router";
import {
  ActivityLists,
  Biography,
  EducationLists,
  InterestList,
  ProfileInfo,
} from "@smartComponents/index";

interface Props {
  type: string;
  selectInterestHandler: (e: string) => any;
}

const ProfilePage: React.FC<Props> = (props) => {
  const [clickEditProfile, setClickEdit] = useState(false);

  const EditButtonClickedHandler = () => {
    setClickEdit(true);
  };
  const backButtonClickedHandler = () => {
    setClickEdit(false);
  };
  // Is it my profile ?
  const isMyProfile = false;

  let profilePrompt = null;

  if (clickEditProfile === false) {
    profilePrompt = (
      <div className={classes.profile}>
        <div className={classes.header}>
          <div className={classes.relativeArrow}>
            <Link data-test="profile-page-back-link" to="/landing">
              <ArrowLeft data-test="profile-page-arrow-left" />
            </Link>
          </div>
          <div className={classes.head}>
            <Heading data-test="profile-page-header" value="My Profile" />
          </div>
        </div>

        <div className={classes.info}>
          <div className={classes.profileInfo}>
            <ProfileInfo name="Rathapat Benjasilarak" role="Developer" />
          </div>
          <div
            className={classes.editProfile}
            onClick={EditButtonClickedHandler}
          >
            {isMyProfile ? <Edit /> : <div />}
          </div>
        </div>

        <div className={classes.about}>
          <Biography
            nickname="home"
            detail="I love coding and Korean girl"
            isMyProfile={isMyProfile}
          />
        </div>

        <div className={classes.education}>
          <EducationLists />
        </div>
        <div className={classes.activity}>
          <ActivityLists />
        </div>
        <div className={classes.interest}>
          <div className={classes.interestHeader}>
            <div className={classes.heading}>Interests</div>
            <div className={classes.addIcon}>
              {isMyProfile ? <PlusCircle /> : <div />}
            </div>
          </div>
          <div className={classes.interestLists}>
            <InterestList
              data-test="interest-list-business"
              selectInterestHandlerDiv={(currentState: boolean) => {
                props.selectInterestHandler("Marketing");
              }}
              value="Marketing"
              key="Marketing"
            />
            <InterestList
              data-test="interest-list-business"
              selectInterestHandlerDiv={(currentState: boolean) => {
                props.selectInterestHandler("Ecommerce");
              }}
              value="Ecommerce"
              key="Ecommerce"
            />
          </div>
        </div>
      </div>
    );
  } else {
    profilePrompt = (
      <div className={classes.editPrompt}>
        <div className={classes.header}>
          <div
            className={classes.relativeArrow}
            onClick={backButtonClickedHandler}
          >
            <ArrowLeft data-test="profile-page-arrow-left" />
          </div>
          <div className={classes.head}>
            <Heading data-test="profile-page-header" value="Edit Profile" />
          </div>
          <div className={classes.saveBtn}>Save</div>
        </div>
        <EditPrompt />
      </div>
    );
  }

  return (
    <div className={classes.main}>
      <div className={classes.container}>{profilePrompt}</div>
    </div>
  );
};

export default ProfilePage;
