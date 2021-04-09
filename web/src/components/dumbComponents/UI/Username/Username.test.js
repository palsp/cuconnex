import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../../../test/testUtils";
import Username from "./Username";

const setup = (props) => {
  const wrapper = shallow(<Username {...props} />);
  return wrapper;
};

it("should render username component", () => {
  const wrapper = setup();
  const usernameComponent = findByTestAttr(wrapper, "usernameComponent");
  expect(usernameComponent.length).toBe(1);
});

it("should render username value based on prop value", () => {
  const wrapper = setup({ value: "mickykrub" });
  const usernamePropValue = findByTestAttr(
    wrapper,
    "username-prop-value"
  ).text();
  expect(usernamePropValue).toBe("mickykrub");
});
