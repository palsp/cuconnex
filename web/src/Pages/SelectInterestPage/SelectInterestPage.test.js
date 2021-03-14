import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../test/testUtils";
import SelectInterestPage from "./SelectInterestPage";

const setup = () => {
  const wrapper = shallow(<SelectInterestPage />);
  return wrapper;
};

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

it("should render arrow left icon", () => {
  const wrapper = setup();
  const arrowLeft = findByTestAttr(wrapper, "arrow-left");
  expect(arrowLeft.length).toBe(1);
});

it("should render dot indicating pages", () => {
  const wrapper = setup();
  const dotIcon = findByTestAttr(wrapper, "dot-icon");
  expect(dotIcon.length).toBe(1);
});

it("should render arrow right icon", () => {
  const wrapper = setup();
  const arrowRight = findByTestAttr(wrapper, "arrow-right");
  expect(arrowRight.length).toBe(1);
});

// it("should render submit button if interest is selected", () => {
//   const wrapper = setup();
//   let submitButton = findByTestAttr(wrapper, "submit-button");
//   expect(submitButton.length).toBe(0);
//   const interestList = findByTestAttr(wrapper, "interest-list");
//   interestList.simulate("click");
//   submitButton = findByTestAttr(wrapper, "submit-button");
//   expect(submitButton.length).toBe(1);
// });
