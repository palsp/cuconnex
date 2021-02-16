import React from "react";
import { shallow } from "enzyme";
import LoginPage from "./LoginPage";
import { findByTestAttr } from "../../../test/testUtils";

const setup = (initialState = {}) => {
  const wrapper = shallow(<LoginPage {...initialState} />);
  return wrapper;
};
describe("Login Page", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  it("should render App Logo", () => {
    const appLogo = findByTestAttr(wrapper, "app-logo");
    expect(appLogo.length).toBe(1);
  });
  it("should render background", () => {
    const appBackground = findByTestAttr(wrapper, "app-background");
    expect(appBackground.length).toBe(1);
  });
});
