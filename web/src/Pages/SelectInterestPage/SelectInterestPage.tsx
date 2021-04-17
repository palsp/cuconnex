import React, { useState, useEffect, useContext } from "react";
import axios from "@src/api/axiosInstance/axiosInstance";
import { Link } from "react-router-dom";

import { AuthenticatedContext } from "@src/AuthenticatedContext";
import { Redirect } from "react-router";

import {
  Heading,
  Subtitle,
  DotMorePage,
  Button,
} from "@dumbComponents/UI/index";

import { InterestLists } from "@smartComponents/index";

import { ArrowLeft, ArrowRight } from "@icons/index";

import { createUserDataAPI } from "@api/index";

import { ICreateUserData } from "@models/index";

import classes from "./SelectInterestPage.module.css";
import mockInterestLists from "@src/mockData/mockInterestListsData";
import mockInterestListsData from "@src/mockData/mockInterestListsData";

interface Props {
  location: {
    state: {
      name: string;
      faculty: string;
      profilePic: File;
    };
  };
  page?: string;
}

interface InterestListsArray {
  Technology: string[];
  Business: string[];
  Design: string[];
}

const SelectInterestPage: React.FunctionComponent<Props> = (props) => {
  const [interestArray, setInterestArray] = useState<InterestListsArray>({
    Technology: [],
    Business: [],
    Design: [],
  });

  const { isAuthenticated, setIsAuthenticated } = useContext(
    AuthenticatedContext
  );

  let name = "";
  let faculty = "";
  let profilePic: File;
  let saveButton = null;
  const emptyInterests: InterestListsArray = {
    Technology: [],
    Business: [],
    Design: [],
  };

  const [editInterest, setEditInterest] = useState(false);

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

  //These are Nat's test
  //   useEffect(() => {
  //     console.log("Fetching data GET /api/users");
  //     const fetchUserData = async () => {
  //       // const fetchInterestArray = { Business: [] };
  //       const fetchInterestArray = { Business: ["Marketing", "Ecommerce"] };

  //       if (fetchInterestArray.Business.length !== 0) {
  //         setEditInterest(true);
  //       }

  //       // try {
  //       //   const userData = await axios.get("/api/users");
  //       //   console.log("Successfully GET userData", userData);
  //       // } catch (e) {
  //       //   console.log("Errors FETCHING userData", e);
  //       //   console.log("Am I Authen?", isAuthenticated);
  //       // }
  //     };
  //     fetchUserData();
  //   }, []);
  const setUserData = async () => {
    if (props.location.state) {
      name = props.location.state.name;
      profilePic = props.location.state.profilePic;
      faculty = props.location.state.faculty;
    }
    const userData: ICreateUserData = {
      name: name,
      interests: interestArray,
      faculty: faculty,
      profilePic: profilePic,
    };
    try {
      const result = await createUserDataAPI(userData);
      console.log("POST to /api/users is successful", result);
    } catch (e) {
      console.log("SelectInterestPage Error setting users data", e);
    }
  };

  const setEmptyInterest = async () => {
    if (props.location.state) {
      name = props.location.state.name;
      profilePic = props.location.state.profilePic;
    }
    const userData: ICreateUserData = {
      name: name,
      interests: emptyInterests,
      faculty: faculty,
      profilePic: profilePic,
    };
    try {
      const result = await createUserDataAPI(userData);
      console.log("POST to /api/users is successful", result);
    } catch (e) {
      console.log("SelectInterestPage Error setting users data", e);
    }
  };
  useEffect(() => {
    console.log("Items in interestArray", interestArray);
  }, [interestArray]);
  useEffect(() => {
    console.log(
      "State passed from PersonalInformationPage",
      props.location.state
    );
  }, []);

  if (
    (interestArray.Technology.length !== 0 ||
      interestArray.Business.length !== 0 ||
      interestArray.Design.length !== 0) &&
    props.location.state
  ) {
    saveButton = (
      <Link
        to={{
          pathname: "/success",
          state: {
            name: props.location.state.name,
            interests: interestArray,
          },
        }}
      >
        <Button onClick={setUserData} value="SAVE" />
      </Link>
    );
  } else {
    saveButton = null;
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

          {editInterest ? (
            <Link to="/profile">
              <Button value="Save" />
            </Link>
          ) : (
            <div className={classes.footerNavigation}>
              <Link to="/personalinformation">
                <div className={classes.footerIcon}>
                  <ArrowLeft data-test="arrow-left" />
                  <Heading size="small" value="Back" />
                </div>
              </Link>
              <DotMorePage data-test="dot-icon" amount={3} />
              <div onClick={setEmptyInterest}>
                <Link to="/success">
                  <div className={classes.footerIcon}>
                    <Heading size="small" value="Skip" />
                    <ArrowRight data-test="arrow-right" />
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// SelectInterestPage.defaultProps = {
//   location: {
//     state: {
//       name: "Micky",
//     },
//   },
// };

// const fetchUserData = async () => {
//   console.log("GET /api/users");
//   try {
//     const response = await axios.get("/api/users/123");
//   } catch (e) {
//     console.log("SelectInterestPage Error getting users data", e);
//   }
// };

export default SelectInterestPage;
