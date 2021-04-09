import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../../../test/testUtils";
import Subtitle from "./Subtitle";

const setup = (props) => {
  const wrapper = shallow(<Subtitle {...props} />);
  return wrapper;
};
it("should render subtitle", () => {
  const wrapper = setup();
  const subtitle = findByTestAttr(wrapper, "subtitle");
  expect(subtitle.length).toBe(1);
});

it("should render value according to prop", () => {
  const wrapper = setup({ value: "testProp" });
  const subtitlePropValue = findByTestAttr(
    wrapper,
    "subtitle-prop-value"
  ).text();
  expect(subtitlePropValue).toBe("testProp");
});
