import React from "react";
import { shallow } from "enzyme";
import LoginPage from "./LoginPage";
import { findByTestAttr } from "../../../test/testUtils";

const setup = (initialState = {}) => {
  const wrapper = shallow(<LoginPage {...initialState} />);
  return wrapper;
};
describe("Login Page", () => {
  it("should render App Logo", () => {
    const wrapper = setup();
    const AppLogo = findByTestAttr(wrapper, "app-logo");
    expect(AppLogo.length).toBe(1);
  });
});
