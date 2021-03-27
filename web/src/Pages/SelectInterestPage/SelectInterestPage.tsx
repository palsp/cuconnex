import React, { useState, useEffect } from "react";
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

const SelectInterestPage: React.FC = () => {
  const [interestArray, setInterestArray] = useState<Array<string>>([]);
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
  useEffect(() => {
    console.log("this is interestArray", interestArray);
  }, [interestArray]);
  let saveButton = null;
  if (interestArray.length !== 0) {
    saveButton = <Button value="Done" />;
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
          
          <Link to="/success">
            <div className={classes.divSaveButton}>{saveButton}</div>
          </Link>

          <div className={classes.footerNavigation}>
            <Link to="/personalinformation">
              <div className={classes.footerIcon}>
                <ArrowLeft data-test="arrow-left" />
                <Heading size="small" value="Back" />
              </div>
            </Link>
            <DotMorePage data-test="dot-icon" amount={3} />
            <Link to="/success">
              <div className={classes.footerIcon}>
                <Heading size="small" value="Skip" />
                <ArrowRight data-test="arrow-right" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectInterestPage;
