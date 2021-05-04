import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "@context/UserContext";
import {
  Heading,
  Subtitle,
  DotMorePage,
  Button,
} from "@dumbComponents/UI/index";
import { InterestLists } from "@smartComponents/index";
import { ArrowLeft } from "@icons/index";
import { createUserDataAPI } from "@api/index";
import { ICreateUserData } from "@models/index";
import classes from "./SelectInterestPage.module.css";
import mockInterestListsData from "@src/mockData/mockInterestListsData";
import { ErrorContext } from "@context/ErrorContext";

interface Props {
  location: {
    state: {
      name: string;
      faculty: string;
      bio: string;
      year: string;
      profilePic: File;
      role: string;
      page?: string;
    };
  };
  history: { goBack: () => void };
}

interface InterestListsArray {
  Technology: string[];
  Business: string[];
  Design: string[];
}

const SelectInterestPage: React.FunctionComponent<Props> = (props) => {
  const { setErrorHandler } = useContext(ErrorContext);
  const [redirect, setRedirect] = useState<JSX.Element>();
  const [interestArray, setInterestArray] = useState<InterestListsArray>({
    Technology: [],
    Business: [],
    Design: [],
  });
  const { fetchUserDataHandler } = useContext(UserContext);
  let name = "";
  let faculty = "";
  let bio = "";
  let year = "";
  let role = "";
  let profileImage: File;
  let saveButton = null;

  useEffect(() => {
    console.log(
      "State passed from PersonalInformationPage",
      props.location.state
    );
  }, []);

  const backButtonHandler = () => {
    props.history.goBack();
  };
  const selectTechnologyInterestHandler = (e: string) => {
    const positionOfE = interestArray.Technology.indexOf(e);
    if (positionOfE === -1) {
      setInterestArray({
        ...interestArray,
        Technology: [...interestArray.Technology, e],
      });
    } else {
      const newInterestArray = [...interestArray.Technology];
      newInterestArray.splice(positionOfE, 1);
      setInterestArray({
        ...interestArray,
        Technology: newInterestArray,
      });
    }
  };
  const selectBusinessInterestHandler = (e: string) => {
    const positionOfE = interestArray.Business.indexOf(e);
    if (positionOfE === -1) {
      setInterestArray({
        ...interestArray,
        Business: [...interestArray.Business, e],
      });
    } else {
      const newInterestArray = [...interestArray.Business];
      newInterestArray.splice(positionOfE, 1);
      setInterestArray({ ...interestArray, Business: newInterestArray });
    }
  };
  const selectDesignInterestHandler = (e: string) => {
    const positionOfE = interestArray.Design.indexOf(e);
    if (positionOfE === -1) {
      setInterestArray({
        ...interestArray,
        Design: [...interestArray.Design, e],
      });
    } else {
      const newInterestArray = [...interestArray.Design];
      newInterestArray.splice(positionOfE, 1);
      setInterestArray({ ...interestArray, Design: newInterestArray });
    }
  };

  const setUserDataFirstTime = async () => {
    if (props.location.state) {
      name = props.location.state.name;
      profileImage = props.location.state.profilePic;
      faculty = props.location.state.faculty;
      bio = props.location.state.bio;
      year = props.location.state.year;
      role = props.location.state.role;
    }
    const userData: ICreateUserData = {
      name: name,
      interests: interestArray,
      faculty: faculty,
      bio: bio,
      role: role,
      year: year,
      image: profileImage,
    };
    console.log("upload userdata...", userData);
    try {
      const result = await createUserDataAPI(userData);
      console.log("POST createUserData to /api/users is successful", result);
      try {
        await fetchUserDataHandler();
        setRedirect(
          <Redirect
            to={{
              pathname: "/success",
              state: {
                name: userData.name,
              },
            }}
          />
        );
      } catch (e) {
        setErrorHandler(e.response.data.errors[0].message);
        setRedirect(<Redirect to="/" />);
        console.log("POST signup success but failed GET fetching");
      }
    } catch (e) {
      // setErrorHandler(e.response.data.errors[0].message);
      console.log("SelectInterestPage Error setting users data", e);
      setRedirect(<Redirect to="/" />);
    }
  };

  if (
    (interestArray.Technology.length !== 0 ||
      interestArray.Business.length !== 0 ||
      interestArray.Design.length !== 0) &&
    props.location.state
  ) {
    if (props.location.state.page === "profile") {
      saveButton = (
        <Button
          onClick={() => setRedirect(<Redirect to="/landing" />)}
          value="SAVE"
        />
      );
    } else {
      saveButton = <Button onClick={setUserDataFirstTime} value="SAVE" />;
    }
  } else {
    saveButton = null;
  }

  let selectInterestPrompt = null;

  if (!props.location.state) {
    selectInterestPrompt = <div></div>;
    saveButton = (
      <Link
        to={{
          pathname: "/profile",
        }}
      >
        {/* Should not be setUserDataFirstTime bc this is for editing interests */}
        <Button onClick={setUserDataFirstTime} value="SAVE" />
      </Link>
    );
  } else {
    selectInterestPrompt = (
      <div className={classes.footerNavigation}>
        <div onClick={backButtonHandler} className={classes.footerIcon}>
          <ArrowLeft data-test="arrow-left" />
          <Heading size="small" value="Back" />
        </div>
        <DotMorePage data-test="dot-icon" amount={3} />
        <div>
          <Link to="/" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={classes.main}>
        <div className={classes.container}>
          <div className={classes.headerDiv}>
            <div className={classes.heading}>
              <Heading data-test="heading" value="Interests" />
            </div>
            <div className={classes.subtitleDiv}>
              <Subtitle value="Please Select at least 1 interest" />
            </div>
          </div>
          <div className={classes.heading}>
            <Heading size="small" value="Business" />
          </div>
          <InterestLists
            data={mockInterestListsData}
            selectInterestHandler={selectBusinessInterestHandler}
            data-test="interest-list-business"
            type="BUSINESS"
          />
          <div className={classes.heading}>
            <Heading size="small" value="Technology" />
          </div>
          <InterestLists
            data={mockInterestListsData}
            selectInterestHandler={selectTechnologyInterestHandler}
            data-test="interest-list-technology"
            type="TECHNOLOGY"
          />
          <div className={classes.heading}>
            <Heading size="small" value="Design" />
          </div>
          <InterestLists
            data={mockInterestListsData}
            selectInterestHandler={selectDesignInterestHandler}
            data-test="interest-list-design"
            type="DESIGN"
          />
          <div className={classes.divSaveButton}>{saveButton}</div>
          {selectInterestPrompt}
          {redirect}
        </div>
      </div>
    </>
  );
};

export default SelectInterestPage;
