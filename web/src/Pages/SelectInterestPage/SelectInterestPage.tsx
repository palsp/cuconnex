import React from "react";
import InterestLists from "../../components/dumbComponents/InterestLists/InterestLists";
import Background from "../../components/dumbComponents/UI/Background/Background";
import HalfCircleOverlay from "../../components/dumbComponents/UI/HalfCircleOverlay/HalfCircleOverlay";
import Heading from "../../components/dumbComponents/UI/Heading/Heading";
import Subtitle from "../../components/dumbComponents/UI/Subtitle/Subtitle";
import DotMorePage from "../../components/dumbComponents/UI/DotMorePage/DotMorePage";

import classes from "./SelectInterestPage.module.css";

const SelectInterestPage: React.FC = () => {
  return (
    <>
      <HalfCircleOverlay data-test="login-page-halfcircleoverlay" />
      <Background data-test="login-page-background" />
      <div className={classes.heading}>
        <Heading data-test="heading" value="Interests" />
      </div>
      <>
        <Subtitle value="Don't worry, you can adjust your interest later." />
      </>
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
      <DotMorePage data-test="dot-icon" amount={2} />
    </>
  );
};

export default SelectInterestPage;
