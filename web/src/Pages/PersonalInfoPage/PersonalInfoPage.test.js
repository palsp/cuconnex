import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../test/testUtils";
import PersonalInfoPage from "./PersonalInfoPage";

const setup = (props) => {
  const wrapper = shallow(<PersonalInfoPage {...props} />);
  return wrapper;
};
describe("render Personal Info Page", () => {
  it("should render Background", () => {
    const wrapper = setup();
    const background = findByTestAttr(wrapper, "personal-info-background");
    expect(background.length).toBe(1);
  });

  it("should render Header", () => {
    const wrapper = setup();
    const header = findByTestAttr(wrapper, "personal-info-header");
    expect(header.length).toBe(1);
  });
  it("should render subtitle", () => {
    const wrapper = setup();
    const subtitle = findByTestAttr(wrapper, "personal-info-subtitle");
    expect(subtitle.length).toBe(1);
  });
  // it("should render personalImage", () => {
  //   const wrapper = setup();
  //   const personalImage = findByTestAttr(
  //     wrapper,
  //     "personal-info-personalImage"
  //   );
  //   expect(personalImage.length).toBe(1);
  // });

  it("should render form", () => {
    const wrapper = setup();
    const personalForm = findByTestAttr(wrapper, "personal-info-form");
    expect(personalForm.length).toBe(1);
  });
  // it("should render setDisplayedName", () => {
  //   const wrapper = setup();
  //   const setDisplayedName = findByTestAttr(
  //     wrapper,
  //     "personal-info-setDisplayedName"
  //   );
  //   expect(setDisplayedName.length).toBe(1);
  // });
  // it("should render setFaculty", () => {
  //   const wrapper = setup();
  //   const setFaculty = findByTestAttr(wrapper, "personal-info-setFaculty");
  //   expect(setFaculty.length).toBe(1);
  // });
  // it("should render setMajor", () => {
  //   const wrapper = setup();
  //   const setMajor = findByTestAttr(wrapper, "personal-info-setMajor");
  //   expect(setMajor.length).toBe(1);
  // });
  // it("should render setYear", () => {
  //   const wrapper = setup();
  //   const setYear = findByTestAttr(wrapper, "personal-info-setYear");
  //   expect(setYear.length).toBe(1);
  // });

  it("should render dotIcon", () => {
    const wrapper = setup();
    const wrapperDive = findByTestAttr(wrapper, "personal-info-form").dive();
    const dotIcon = findByTestAttr(wrapperDive, "personal-info-dotIcon");
    expect(dotIcon.length).toBe(1);
  });
  it("should render arrowRight", () => {
    const wrapper = setup();
    const wrapperDive = findByTestAttr(wrapper, "personal-info-form").dive();
    const arrowRight = findByTestAttr(wrapperDive, "personal-info-arrowRight");

    expect(arrowRight.length).toBe(1);
  });
});
