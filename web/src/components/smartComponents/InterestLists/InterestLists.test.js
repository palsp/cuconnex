import React from "react";
import { shallow } from "enzyme";
import InterestLists from "./InterestLists";
import { findByTestAttr } from "../../../../test/testUtils";

const setup = (props) => {
  const wrapper = shallow(<InterestLists {...props} />);
  return wrapper;
};

it("should render interest lists", () => {
  const wrapper = setup();
  const interestLists = findByTestAttr(wrapper, "interest-lists");
  expect(interestLists.length).toBe(1);
});

