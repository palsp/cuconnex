import React from "react";
import { shallow } from "enzyme";
import LoginPrompt from "./LoginPrompt";
import { findByTestAttr } from "../../../../test/testUtils";

const setup = (initialState = {}) => {
  const wrapper = shallow(<LoginPrompt {...initialState} />);
  return wrapper;
};

describe("click login value is equal to true", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
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
    const inputFields = findByTestAttr(wrapper, "auth-page-login-input-fields");
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
