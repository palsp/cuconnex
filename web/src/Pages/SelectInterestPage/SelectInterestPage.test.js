import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../test/testUtils";
import SelectInterestPage from "./SelectInterestPage";

const setup = () => {
  const wrapper = shallow(<SelectInterestPage />);
  return wrapper;
};

it("should render background", () => {
  const wrapper = setup();

  const background = findByTestAttr(wrapper, "login-page-background");
  expect(background.length).toBe(1);
});
it("should render HalfCircleOverlay", () => {
  const wrapper = setup();

  const halfCircleOverlay = findByTestAttr(
    wrapper,
    "login-page-halfcircleoverlay"
  );
  expect(halfCircleOverlay.length).toBe(1);
});

it("should render heading", () => {
  const wrapper = setup();
  const heading = findByTestAttr(wrapper, "heading");
  expect(heading.length).toBe(1);
});

it("should render interest list business", () => {
  const wrapper = setup();
  const interestListBusiness = findByTestAttr(
    wrapper,
    "interest-list-business"
  );
  expect(interestListBusiness.length).toBe(1);
});

it("should render interest list technology", () => {
  const wrapper = setup();
  const interestListTechnology = findByTestAttr(
    wrapper,
    "interest-list-technology"
  );
  expect(interestListTechnology.length).toBe(1);
});

it("should render interest list design", () => {
  const wrapper = setup();
  const interestListDesign = findByTestAttr(wrapper, "interest-list-design");
  expect(interestListDesign.length).toBe(1);
});

// it("should render back to previous page icon", () => {
//   const wrapper = setup();
//   const backIcon = findByTestAttr(wrapper, "back-icon");
//   expect(backIcon.length).toBe(1);
// });

// it("should render dot indicating pages", () => {
//   const wrapper = setup();
//   const dotIcon = findByTestAttr(wrapper, "dot-icon");
//   expect(dotIcon.length).toBe(1);
// });

// it("should render skip icon", () => {
//   const wrapper = setup();
//   const skipIcon = findByTestAttr(wrapper, "skip-icon");
//   expect(skipIcon.length).toBe(1);
// });
