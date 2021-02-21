import React from "react";
import { shallow } from "enzyme";
import Button from "./Button";
import { findByTestAttr } from "../../../../../test/testUtils";

const setup = (props) => {
  const wrapper = shallow(<Button {...props} />);
  return wrapper;
};
it("should render button", () => {
  const wrapper = setup({});
  const button = findByTestAttr(wrapper, "button");
  expect(button.length).toBe(1);
});

it("should have value according to props.value", () => {
  const wrapper = setup({ value: "testValue" });
  const buttonProps = findByTestAttr(wrapper, "button-props-value").text();
  expect(buttonProps).toBe("testValue");
});
