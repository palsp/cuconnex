import React from "react";
import { shallow } from "enzyme";
import AuthPage from "./AuthPage";
import { findByTestAttr } from "../../../test/testUtils";

const setup = (initialState = {}) => {
  const wrapper = shallow(<AuthPage {...initialState} />);
  return wrapper;
};
describe("auth Page", () => {
  describe("click signup value is equal to false", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });
    it("should render App Logo", () => {
      const logo = findByTestAttr(wrapper, "auth-page-logo");
      expect(logo.length).toBe(1);
    });
    it("should render background", () => {
      const background = findByTestAttr(wrapper, "auth-page-background");
      expect(background.length).toBe(1);
    });
    it("should render HalfCircleOverlay", () => {
      const halfCircleOverlay = findByTestAttr(
        wrapper,
        "auth-page-halfcircleoverlay"
      );
      expect(halfCircleOverlay.length).toBe(1);
    });
    it("should render signup button", () => {
      const authButton = findByTestAttr(wrapper, "auth-page-signup-button");
      expect(authButton.length).toBe(1);
    });
    it("should NOT render input fields", () => {
      const inputFields = findByTestAttr(wrapper, "auth-page-input-fields");
      expect(inputFields.length).toBe(0);
    });
    it("should NOT render next button", () => {
      const nextButton = findByTestAttr(wrapper, "auth-page-next-button");
      expect(nextButton.length).toBe(0);
    });
  });
  describe("click signup value is equal to true", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
      const signupButton = findByTestAttr(wrapper, "auth-page-signup-button");
      signupButton.simulate("click");
    });
    it("should render header welcome", () => {
      const header = findByTestAttr(wrapper, "auth-page-signup-header");
      expect(header.length).toBe(1);
    });
    it("should render subtitle", () => {
      const subtitle = findByTestAttr(wrapper, "auth-page-signup-subtitle");
      expect(subtitle.length).toBe(1);
    });
    it("should render input fields", () => {
      const inputFields = findByTestAttr(
        wrapper,
        "auth-page-signup-input-fields"
      );
      expect(inputFields.length).toBe(3);
    });
    it("should render next button", () => {
      const nextButton = findByTestAttr(
        wrapper,
        "auth-page-signup-next-button"
      );
      expect(nextButton.length).toBe(1);
    });
    it("should NOT render auth button", () => {
      const authButton = findByTestAttr(
        wrapper,
        "auth-page-signup-auth-button"
      );
      expect(authButton.length).toBe(0);
    });
    it("should render dot icon", () => {
      const dotIcon = findByTestAttr(wrapper, "dot-icon");
      expect(dotIcon.length).toBe(1);
    });
    it("should render back navigation", () => {
      const backNavigation = findByTestAttr(wrapper, "back-navigation");
      expect(backNavigation.length).toBe(1);
    });
  });

  describe("click login value is equal to true", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
      const loginButton = findByTestAttr(wrapper, "auth-page-login-button");
      loginButton.simulate("click");
    });
    it("should render header welcome", () => {
      const header = findByTestAttr(wrapper, "auth-page-login-header");
      expect(header.length).toBe(1);
    });
    it("should render subtitle", () => {
      const subtitle = findByTestAttr(wrapper, "auth-page-login-subtitle");
      expect(subtitle.length).toBe(1);
    });
    it("should render input fields", () => {
      const inputFields = findByTestAttr(
        wrapper,
        "auth-page-login-input-fields"
      );
      expect(inputFields.length).toBe(2);
    });
    it("should render login button", () => {
      const nextButton = findByTestAttr(wrapper, "auth-page-login-button");
      expect(nextButton.length).toBe(1);
    });
    it("should NOT render dot icon", () => {
      const dotIcon = findByTestAttr(wrapper, "dot-icon");
      expect(dotIcon.length).toBe(0);
    });
    it("should render back navigation", () => {
      const backNavigation = findByTestAttr(wrapper, "back-navigation");
      expect(backNavigation.length).toBe(1);
    });
  });
});
