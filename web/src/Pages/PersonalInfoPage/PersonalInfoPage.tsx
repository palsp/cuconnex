import React from "react";
import InterestList from "../../components/dumbComponents/InterestLists/InterestList/InterestList";
import Background from "../../components/dumbComponents/UI/Background/Background";
import DotMorePage from "../../components/dumbComponents/UI/DotMorePage/DotMorePage";
import HalfCircleOverlay from "../../components/dumbComponents/UI/HalfCircleOverlay/HalfCircleOverlay";
import Heading from "../../components/dumbComponents/UI/Heading/Heading";
import ArrowLeft from "../../components/dumbComponents/UI/Icons/ArrowLeft/ArrowLeft";
import ArrowRight from "../../components/dumbComponents/UI/Icons/ArrowRight/ArrowRight";
import InputField from "../../components/dumbComponents/UI/InputField/InputField";
import Subtitle from "../../components/dumbComponents/UI/Subtitle/Subtitle";
import Username from "../../components/dumbComponents/UI/Username/Username";

const PersonalInfoPage: React.FC = () => {
  return (
    <>
      <Background />
      <HalfCircleOverlay />
      <Heading data-test="personal-info-header" value="Personal Information" />
      <Subtitle
        data-test="personal-info-subtitle"
        value="Setting up your profile"
      />
      <InterestList data-test="personal-info-personalImage" value="Coding" />
      <Username data-test="personal-info-username" value="@micky_ngub" />
      <InputField
        data-test="personal-info-setDisplayedName"
        value="Displayed Name"
      />
      <InputField data-test="personal-info-setFaculty" value="Faculty" />
      <InputField data-test="personal-info-setMajor" value="Major" />
      <InputField data-test="personal-info-setYear" value="Year of study" />
      <ArrowLeft data-test="personal-info-arrowLeft" />
      <Heading value="Back" size="small" />
      <DotMorePage data-test="personal-info-dotIcon" amount={3} />
      <Heading value="Skip" size="small" />
      <ArrowRight data-test="personal-info-arrowRight" />
    </>
  );
};

export default PersonalInfoPage;
