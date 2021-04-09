import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../../../test/testUtils";
import DotMorePage from "./DotMorePage";

const setup = (props) => {
  const wrapper = shallow(<DotMorePage {...props} />);
  return wrapper;
};
it("should not render dot more page without prop", () => {
  const wrapper = setup();
  const dotMorePage = findByTestAttr(wrapper, "dotMorePage");
  expect(dotMorePage.length).toBe(0);
});

describe("render amount of dot according to prop amount", () => {
  it("should render 1 dot svg if prop amount is 1", () => {
    const wrapper = setup({ amount: 1 });
    const dotMorePage = findByTestAttr(wrapper, "dot-prop-amount-1");
    expect(dotMorePage.length).toBe(1);
  });
  it("should render 2 dot svg if prop amount is 2", () => {
    const wrapper = setup({ amount: 2 });
    const dotMorePage = findByTestAttr(wrapper, "dot-prop-amount-2");
    expect(dotMorePage.length).toBe(1);
  });
  it("should render 3 dot svg if prop amount is 3", () => {
    const wrapper = setup({ amount: 3 });
    const dotMorePage = findByTestAttr(wrapper, "dot-prop-amount-3");
    expect(dotMorePage.length).toBe(1);
  });
});
