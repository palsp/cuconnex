import React from "react";
import { shallow } from "enzyme";
import AppLogo from "./AppLogo";
import { findByTestAttr } from "../../../../../test/testUtils";

const setup = () => {
  const wrapper = shallow(<AppLogo />);
  return wrapper;
};

it("should render app logo", () => {
  const wrapper = setup();
  const appLogo = findByTestAttr(wrapper, "app-logo");
  expect(appLogo.length).toBe(1);
});
