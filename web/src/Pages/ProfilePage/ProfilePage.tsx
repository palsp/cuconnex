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
import containerVariants, {
  IAddFriend,
  IEducationData,
  IUserFriend,
} from "@src/models/models";
import PageTitle from "@dumbComponents/UI/PageTitle/PageTitle";
interface Props {
  location: {
    state: {
      users: IUserFriend;
    };
  };
  history: {
    goBack: () => void;
  };
}

const ProfilePage: React.FC<Props> = (props) => {
  const [isFriend, setIsFriend] = useState<string>("");
  const [clickEditProfile, setClickEdit] = useState(false);
  const [clickEditOption, setClickEditOption] = useState(false); // true == 'Profile', false = 'About'
  const [dataFetched, setDataFetched] = useState(false);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    fetchRelationHandler(props.location.state.users.id);
  }, []);

  console.log(userData);
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

  const goBack = () => {
    props.history.goBack();
  };
  const fetchRelationHandler = async (userId: string) => {
    const relationResult = await fetchRelationAPI(userId);
    console.log(relationResult.data.status);
    setIsFriend(relationResult.data.status);
    setDataFetched(true);
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
    console.log("This is user's own profile", { isFriend });
  }
  // Is it my profile ?
  const userId = props.location.state.users.id;
  const isMyProfile = userId === userData.id;
  const pageTitle = isMyProfile
    ? "My Profile"
    : props.location.state.users.name;

  const selectBusinessInterestHandler = () => {
    console.log("clicked");
  };

  const education: IEducationData[] = [
    {
      faculty: props.location.state.users.faculty,
      year: props.location.state.users.year,
    },
  ];

  let profilePrompt = null;
  if (clickEditProfile === false) {
    profilePrompt = (
      <div className={classes.profile}>
        <PageTitle goBack={goBack} size="medium" text={pageTitle} />

        <div className={classes.info}>
          <div className={classes.profileInfo}>
            <ProfileInfo
              name={props.location.state.users.name}
              role={props.location.state.users.role}
              image={props.location.state.users.image}
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
                onClick={() => addFriendHandler({ userId: userId })}
                className={classes.buttonDiv}
              >
                <div className={classes.buttonTextDiv}>Connect</div>
              </div>
            ) : isFriend == "Pending" ? (
              <div className={classes.pendingButtonDiv}>
                <div className={classes.buttonTextDiv}>Pending</div>
              </div>
            ) : isFriend == "Accept" ? (
              <div className={classes.acceptButtonDiv}>
                <div className={classes.buttonTextDiv}>Connected</div>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>

        <div className={classes.about}>
          <div className={classes.bio}>
            <Biography
              nickname={props.location.state.users.name}
              detail={props.location.state.users.bio}
            />
          </div>
          <div className={classes.editAbout} onClick={EditAboutClickedHandler}>
            {/* {isMyProfile ? <Edit /> : ""} */}
          </div>
        </div>

        <div className={classes.education}>
          {/* <EducationList
            faculty={props.location.state.users.faculty}
            year={props.location.state.users.year}
            major={props.location.state.users.bio}
          /> */}

          {/* <EducationLists education={mockEducationListsData} /> */}
          {/* Home's work   */}
          <EducationLists education={education} />
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
                    state: { users: userData },
                  }}
                >
                  <PlusCircle />{" "}
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>

          {/* If we get return as 3 separate interests arrray */}

          <div className={classes.interestLists}>
            {props.location.state.users.interests.map(
              (interest: string, index: number) => {
                return (
                  <InterestList
                    forShow
                    data-test="interest-list-business"
                    selectInterestHandlerDiv={() => {
                      return;
                    }}
                    value={props.location.state.users.interests[index]}
                    key={index}
                  />
                );
              }
            )}

            {/* Starts of home's work
            {/* {props.location.state.users.interests.Business ? (
              props.location.state.users.interests.Business.map(
                (interest: string) => {
                  return (
                    <InterestList
                      data-test="interest-list-business"
                      selectInterestHandlerDiv={() => {
                        return;
                      }}
                      value={interest}
                      key={interest}
                    />
                  );
                }
              )
            ) : (
              <div />
            )}
            {props.location.state.users.interests.Technology ? (
              props.location.state.users.interests.Technology.map(
                (interest: string) => {
                  return (
                    <InterestList
                      data-test="interest-list-business"
                      selectInterestHandlerDiv={() => {
                        return;
                      }}
                      value={interest}
                      key={interest}
                    />
                  );
                }
              )
            ) : (
              <div />
            )}
            {props.location.state.users.interests.Design ? (
              props.location.state.users.interests.Design.map(
                (interest: string) => {
                  return (
                    <InterestList
                      data-test="interest-list-business"
                      selectInterestHandlerDiv={() => {
                        return;
                      }}
                      value={interest}
                      key={interest}
                    />
                  );
                }
              )
            ) : (
              <div />
            )} */}

            {/* If Interest return in one Array This is home's work*/}
            {/*
            {props.location.state.users.interests ? (
              props.location.state.users.interests.map((interest: string) => {
                console.log(interest);
                return (
                  <InterestList
                    data-test="interest-list-business"
                    selectInterestHandlerDiv={() => {
                      return;
                    }}
                    value={interest}
                    key={interest}
                  />
                );
              })
            ) : (
              <div />
            )}

*/}
            {/* Mock Interest */}

            {/* <InterestList
              data-test="interest-list-business"
              selectInterestHandlerDiv={() => {
                return;
              }}
              value="Marketing"
              key="Marketing"
            />
            <InterestList
              data-test="interest-list-business"
              selectInterestHandlerDiv={() => {
                return;
              }}
              value="Ecommerce"
              key="Ecommerce"
            /> */}

            {/*    end of home's work  */}
          </div>
        </div>
      </div>
    );
  } else {
    profilePrompt = (
      <div className={classes.editPrompt}>
        <PageTitle
          goBack={backButtonClickedHandler}
          size="medium"
          text="Edit Profile"
        />
        <EditPrompt
          displayName={props.location.state.users.name}
          role={props.location.state.users.role}
          profileURL={props.location.state.users.image}
          bio={props.location.state.users.bio}
          type={clickEditOption}
        />
        {/* <EditPrompt type={clickEditOption} users={props.location.state.users} /> */}
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
      {dataFetched ? (
        <div className={classes.container}>{profilePrompt}</div>
      ) : (
        "loading"
      )}
    </motion.div>
  );
};

export default ProfilePage;
