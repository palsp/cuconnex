import React from "react";
import { shallow } from "enzyme";
import SignupPrompt from "./SignupPrompt";
import { findByTestAttr } from "../../../../test/testUtils";

const setup = (initialState = {}) => {
  const wrapper = shallow(<SignupPrompt {...initialState} />);
  return wrapper;
};

describe("click signup value is equal to true", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  it("should render header welcome", () => {
    const header = findByTestAttr(wrapper, "auth-page-signup-header");
    expect(header.length).toBe(1);
  });
  it("should render subtitle", () => {
    const subtitle = findByTestAttr(wrapper, "auth-page-signup-subtitle");
    expect(subtitle.length).toBe(1);
  });
  it("should render form", () => {
    const inputFields = findByTestAttr(wrapper, "auth-page-signup-form");
    expect(inputFields.length).toBe(1);
  });
  it("should NOT render auth button", () => {
    const authButton = findByTestAttr(wrapper, "auth-page-signup-auth-button");
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
