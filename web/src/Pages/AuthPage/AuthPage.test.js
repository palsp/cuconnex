import React from "react";
import {shallow} from "enzyme";
import AuthPage from "./AuthPage";
import {findByTestAttr} from "../../../test/testUtils";

const setup = (initialState = {}) => {
  const wrapper = shallow(<AuthPage {...initialState} />);
  return wrapper;
};
describe("auth Page, first render, no button has been clicked", () => {
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
    const halfCircleOverlay = findByTestAttr(wrapper, "auth-page-halfcircleoverlay");
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
  it("should render loginPrompt", () => {
    const loginButton = findByTestAttr(wrapper, "auth-page-login-button");
    loginButton.simulate("click");
    const loginPrompt = findByTestAttr(wrapper, "auth-page-login-prompt");
    expect(loginPrompt.length).toBe(1);
  });
  it("should render signupPrompt", () => {
    const signupButton = findByTestAttr(wrapper, "auth-page-signup-button");
    signupButton.simulate("click");
    const signupPrompt = findByTestAttr(wrapper, "auth-page-signup-prompt");
    expect(signupPrompt.length).toBe(1);
  });
});
