import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../../test/testUtils";
import RecommendedLists from "./RecommendedLists";

const setup = (props) => {
  const wrapper = shallow(<RecommendedLists {...props} />);
  return wrapper;
};

it("should render username component", () => {
  const wrapper = setup();
  const recommendedLists = findByTestAttr(wrapper, "recommendedLists");
  expect(recommendedLists.length).toBe(1);
});
