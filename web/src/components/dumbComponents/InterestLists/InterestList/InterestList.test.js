import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../../../test/testUtils";
import InterestList from "./InterestList";

const setup = (props) => {
  const wrapper = shallow(<InterestList {...props} />);
  return wrapper;
};

it("should render interest list", () => {
  const wrapper = setup();
  const interestList = wrapper.findByTestAttr(wrapper, "interest-list");
  expect(interestList).toBe(1);
});

it("should have value according to the value props", () => {
  const wrapper = setup({ value: "coding" });
  const interestListPropValue = wrapper
    .findByTestAttr(wrapper, "interest-list-props-value")
    .text();
  expect(interestListPropValue).toBe("coding");
});
