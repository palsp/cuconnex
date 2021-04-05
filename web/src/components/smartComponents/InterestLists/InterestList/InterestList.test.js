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
  const interestList = findByTestAttr(wrapper, "interest-list");
  expect(interestList.length).toBe(1);
});

it("should have value according to the value props", () => {
  const wrapper = setup({ value: "coding" });
  const interestListPropValue = findByTestAttr(
    wrapper,
    "interest-list-props-value"
  ).text();
  //need to have whitespace after value!!! or else it will failed.
  expect(interestListPropValue).toBe("coding ");
});
