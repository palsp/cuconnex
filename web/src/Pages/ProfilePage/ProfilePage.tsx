import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Heading } from "@dumbComponents/UI/index";

import { ArrowLeft, Edit, PlusCircle } from "@icons/index";
import EditPrompt from "./EditPrompt/EditPrompt";

import classes from "./ProfilePage.module.css";
import {
  ActivityLists,
  Biography,
  EducationList,
  EducationLists,
  InterestList,
  InterestLists,
  ProfileInfo,
} from "@smartComponents/index";
import mockActivityListsData from "@src/mockData/mockActivityListsData";
import mockEducationListsData from "@src/mockData/mockEducationListsData";
import { IConnected, IUser } from "@src/models";
import { UserContext } from "@context/UserContext";
import { addFriendAPI, fetchRelationAPI } from "@src/api";
import containerVariants, { IAddFriend, IUserFriend } from "@src/models/models";

interface Props {
  location: {
    state: {
      users: IUserFriend;
    };
  };
}
const ProfilePage: React.FC<Props> = (props) => {
  const [isFriend, setIsFriend] = useState<string>("");
  const [clickEditProfile, setClickEdit] = useState(false);
  const [clickEditOption, setClickEditOption] = useState(false); // true == 'Profile', false = 'About'
  const { userData } = useContext(UserContext);
  console.log(userData);
  const friendId = {
    userId: props.location.state.users.id,
  };
  const backButtonClickedHandler = () => {
    setClickEdit(false);
  };

  const EditProfileClickedHandler = () => {
    setClickEditOption(true);
    setClickEdit(true);
  };

  const EditAboutClickedHandler = () => {
    setClickEditOption(false);
    setClickEdit(true);
  };
  const fetchRelationHandler = async (userId: string) => {
    const relationResult = await fetchRelationAPI(userId);
    console.log(relationResult.data.status);
    setIsFriend(relationResult.data.status);
    return relationResult;
  };
  const addFriendHandler = async (addData: IAddFriend) => {
    try {
      const resultAdd = await addFriendAPI(addData);
      console.log(
        "Successfully sent a POST request to users/friends",
        resultAdd
      );
      setIsFriend("Pending");
    } catch (e) {
      console.log("ERRORS occured while POST /users/friends", e);
    }
  };
  if (isFriend == null) {
    console.log("This is user's own profile",{isFriend});
  }
  let isMyProfile = false;
  if (props.location) {
    isMyProfile = props.location.state.users.id == userData.id;
  }
  const isMyFriend = fetchRelationHandler(props.location.state.users.id);
  console.log(props.location.state.users.interests);
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
            <ProfileInfo
              name={props.location.state.users.name}
              role={props.location.state.users.major}
            />
          </div>
          <div
            className={classes.editProfile}
            onClick={EditProfileClickedHandler}
          >
            {isMyProfile ? <Edit /> : <div />}
          </div>
          <div className={classes.addDiv}>
            {isFriend == "toBedefined" ? (
              <div
              onClick={() => addFriendHandler(friendId)}
              className={classes.buttonDiv}
            >
              <div className={classes.buttonTextDiv}>Connect</div>
            </div>
            ) : (
              <div
              className={classes.pendingButtonDiv}
            >
              <div className={classes.buttonTextDiv}>Pending</div>
            </div>
            )}
          </div>
        </div>

        <div className={classes.about}>
          <div className={classes.bio}>
            <Biography
              nickname={props.location.state.users.major}
              detail={props.location.state.users.bio}
            />
          </div>
          <div className={classes.editAbout} onClick={EditAboutClickedHandler}>
            {isMyProfile ? <Edit /> : <div />}
          </div>
        </div>

        <div className={classes.education}>
          <EducationList
            faculty={props.location.state.users.faculty}
            year={props.location.state.users.year}
            major={props.location.state.users.major}
          />
        </div>
        <div className={classes.activity}>
          <ActivityLists activity={mockActivityListsData} />
        </div>
        {/* Interests should be fetched for it to dynamically render */}
        <div className={classes.interest}>
          <div className={classes.interestHeader}>
            <div className={classes.heading}>Interests</div>

            <div className={classes.addIcon}>
              {isMyProfile ? (
                <Link
                  to={{
                    pathname: "/selectinterests",
                  }}
                >
                  <PlusCircle />{" "}
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
          <div className={classes.interestLists}>
          {props.location.state.users.interests.map((interest:string,index:number) => {
            return (
              <InterestList
                data-test="interest-list-business"
                selectInterestHandlerDiv={() => {
                  return;
                }}
                value={props.location.state.users.interests[index]}
                key={index}
              />
            );
          })} 
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
          <div className={classes.saveBtn} data-test="profile-page-save-btn">
            Save
          </div>
        </div>
        <EditPrompt type={clickEditOption} />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={classes.main}
    >
      <div className={classes.container}>{profilePrompt}</div>
    </motion.div>
  );
};

export default ProfilePage;
