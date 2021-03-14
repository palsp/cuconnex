import React, { useState, useEffect } from "react";
import InterestLists from "../../components/smartComponents/InterestLists/InterestLists";
import Heading from "../../components/dumbComponents/UI/Heading/Heading";
import Subtitle from "../../components/dumbComponents/UI/Subtitle/Subtitle";
import DotMorePage from "../../components/dumbComponents/UI/DotMorePage/DotMorePage";

import classes from "./SelectInterestPage.module.css";
import ArrowLeft from "../../components/dumbComponents/UI/Icons/ArrowLeft/ArrowLeft";
import ArrowRight from "../../components/dumbComponents/UI/Icons/ArrowRight/ArrowRight";
import { Link } from "react-router-dom";
import Button from "../../components/dumbComponents/UI/Button/Button";

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
    saveButton = <Button value="SAVE" />;
  } else {
    saveButton = null;
  }
  return (
    <>
      <div className={classes.headerDiv}>
        <div className={classes.heading}>
          <Heading data-test="heading" value="Interests" />
        </div>
        <div className={classes.subtitleDiv}>
          <Subtitle value="Don't worry, you can adjust your interest later." />
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
        <Link to="/">
          <div className={classes.footerIcon}>
            <ArrowLeft data-test="arrow-left" />
            <Heading size="small" value="Back" />
          </div>
        </Link>
        <DotMorePage data-test="dot-icon" amount={2} />
        <Link to="/personalInformation">
          <div className={classes.footerIcon}>
            <Heading size="small" value="Skip" />
            <ArrowRight data-test="arrow-right" />
          </div>
        </Link>
      </div>
    </>
  );
};

export default SelectInterestPage;
