import React from "react";
import { shallow } from "enzyme";
import LoginPage from "./LoginPage";
import { findByTestAttr } from "../../../test/testUtils";

const setup = (initialState = {}) => {
  const wrapper = shallow(<LoginPage {...initialState} />);
  return wrapper;
};
describe("Login Page", () => {
  describe("clickLogin value is equal to false", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });
    it("should render App Logo", () => {
      const logo = findByTestAttr(wrapper, "login-page-logo");
      expect(logo.length).toBe(1);
    });
    it("should render background", () => {
      const background = findByTestAttr(wrapper, "login-page-background");
      expect(background.length).toBe(1);
    });
    it("should render HalfCircleOverlay", () => {
      const halfCircleOverlay = findByTestAttr(
        wrapper,
        "login-page-halfcircleoverlay"
      );
      expect(halfCircleOverlay.length).toBe(1);
    });
    it("should render login button", () => {
      const loginButton = findByTestAttr(wrapper, "login-page-login-button");
      expect(loginButton.length).toBe(1);
    });
    it("should NOT render input fields", () => {
      const inputFields = findByTestAttr(wrapper, "login-page-input-fields");
      expect(inputFields.length).toBe(0);
    });
    it("should NOT render next button", () => {
      const nextButton = findByTestAttr(wrapper, "login-page-next-button");
      expect(nextButton.length).toBe(0);
    });
  });
  describe("clickLogin value is equal to true", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
      const loginButton = findByTestAttr(wrapper, "login-page-login-button");
      loginButton.simulate("click");
    });
    it("should render input fields", () => {
      const inputFields = findByTestAttr(wrapper, "login-page-input-fields");
      expect(inputFields.length).toBe(3);
    });
    it("should render next button", () => {
      const nextButton = findByTestAttr(wrapper, "login-page-next-button");
      expect(nextButton.length).toBe(1);
    });
    it("should NOT render login button", () => {
      const loginButton = findByTestAttr(wrapper, "login-page-login-button");
      expect(loginButton.length).toBe(0);
    });
  });
});
