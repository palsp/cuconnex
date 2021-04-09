import React from "react";
import { findByTestAttr } from "../../../../../test/testUtils";
import { shallow } from "enzyme";
import Heading from "./Heading";

const setup = (props) => {
  const wrapper = shallow(<Heading {...props} />);
  return wrapper;
};

it("should render heading", () => {
  const wrapper = setup();
  const heading = findByTestAttr(wrapper, "heading-title");
  expect(heading.length).toBe(1);
});

it("should render value according to prop value", () => {
  const wrapper = setup({ value: "ThisIsHeading" });
  const headingPropValue = findByTestAttr(wrapper, "heading-prop-value").text();
  expect(headingPropValue).toBe("ThisIsHeading");
});
