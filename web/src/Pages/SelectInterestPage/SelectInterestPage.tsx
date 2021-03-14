import React from "react";
import InterestLists from "../../components/smartComponents/InterestLists/InterestLists";
import Background from "../../components/dumbComponents/UI/Background/Background";
import Heading from "../../components/dumbComponents/UI/Heading/Heading";
import Subtitle from "../../components/dumbComponents/UI/Subtitle/Subtitle";
import DotMorePage from "../../components/dumbComponents/UI/DotMorePage/DotMorePage";

import classes from "./SelectInterestPage.module.css";
import ArrowLeft from "../../components/dumbComponents/UI/Icons/ArrowLeft/ArrowLeft";
import ArrowRight from "../../components/dumbComponents/UI/Icons/ArrowRight/ArrowRight";
import { Link } from "react-router-dom";

const SelectInterestPage: React.FC = () => {
  return (
    <>
      <div className={classes.main}>
        <div className={classes.container}>
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
      <InterestLists data-test="interest-list-business" type="BUSINESS" />
      <div className={classes.heading}>
        <Heading size="small" value="Technology" />
      </div>
      <InterestLists data-test="interest-list-technology" type="TECHNOLOGY" />
      <div className={classes.heading}>
        <Heading size="small" value="Design" />
      </div>
      <InterestLists data-test="interest-list-design" type="DESIGN" />
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
      </div>
      </div>
    </>
  );
};

export default SelectInterestPage;
