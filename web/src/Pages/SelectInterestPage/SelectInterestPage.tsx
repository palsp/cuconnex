import React from "react";
import InterestLists from "../../components/dumbComponents/InterestLists/InterestLists";
import Background from "../../components/dumbComponents/UI/Background/Background";
import HalfCircleOverlay from "../../components/dumbComponents/UI/HalfCircleOverlay/HalfCircleOverlay";
import Heading from "../../components/dumbComponents/UI/Heading/Heading";

const SelectInterestPage: React.FC = () => {
  return (
    <div>
      <HalfCircleOverlay data-test="login-page-halfcircleoverlay" />
      <Background data-test="login-page-background" />
      <Heading data-test="heading" value="Interests" />
      <Heading size="medium" value="Business" />
      <InterestLists data-test="interest-list-business" type="BUSINESS" />
      <Heading size="medium" value="Technology" />

      <InterestLists data-test="interest-list-technology" type="TECHNOLOGY" />
      <Heading size="medium" value="Design" />

      <InterestLists data-test="interest-list-design" type="DESIGN" />
    </div>
  );
};

export default SelectInterestPage;
