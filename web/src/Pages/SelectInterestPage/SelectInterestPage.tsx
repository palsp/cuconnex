import React, { useState, useEffect } from "react";
import axios from "@src/axiosInstance/axiosInstance";
import { Link } from "react-router-dom";

import {
  Heading,
  Subtitle,
  DotMorePage,
  Button,
} from "@dumbComponents/UI/index";

import { InterestLists } from "@smartComponents/index";

import { ArrowLeft, ArrowRight } from "@icons/index";

import classes from "./SelectInterestPage.module.css";

interface Props {
  location: {
    state: {
      name: string;
    };
  };
}

const SelectInterestPage: React.FunctionComponent<Props> = (props) => {
  const [interestArray, setInterestArray] = useState<Array<string>>([]);
  let name = "";
  const selectInterestHandler = (e: string) => {
    let positionOfE = interestArray.indexOf(e);
    if (positionOfE === -1) {
      setInterestArray([...interestArray, e]);
    } else {
      let newInterestArray = [...interestArray];
      newInterestArray.splice(positionOfE, 1);
      setInterestArray(newInterestArray);
    }
  };
  const setUserData = async () => {
    if (props.location.state) {
      name = props.location.state.name;
    }
    let data = {
      name: name,
      interests: interestArray,
    };
    console.log("POST /api/users", data);
    try {
      const result = await axios.post("/api/users", data);
      console.log("POST to /api/users is successful", result);
    } catch (e) {
      console.log("SelectInterestPage Error setting users data", e);
    }
  };
  const setEmptyInterest = async () => {
    if (props.location.state) {
      name = props.location.state.name;
    }
    let data = {
      name: name,
      interest: [],
    };
    console.log("Empty Interest POST /api/users", data);

    try {
      const result = await axios.post("/api/users/", data);
      console.log("POST Empty interests to /api/users is successful", result);
    } catch (e) {
      console.log("SelectInterestPage Error setting empty interest", e);
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
  let saveButton = null;
  if (interestArray.length !== 0 && props.location.state) {
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
            selectInterestHandler={selectInterestHandler}
            data-test="interest-list-business"
            type="BUSINESS"
          />
          <div className={classes.heading}>
            <Heading size="small" value="Technology" />
          </div>
          <InterestLists
            selectInterestHandler={selectInterestHandler}
            data-test="interest-list-technology"
            type="TECHNOLOGY"
          />
          <div className={classes.heading}>
            <Heading size="small" value="Design" />
          </div>
          <InterestLists
            selectInterestHandler={selectInterestHandler}
            data-test="interest-list-design"
            type="DESIGN"
          />

          <div className={classes.divSaveButton}>{saveButton}</div>

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

export default SelectInterestPage;
