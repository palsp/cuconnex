import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../../../test/testUtils";
import RecommendedList from "./RecommendedList";

const recommended = {
  name: "Nat",
  profilePic: "",
  interest: "Marketing, Startup",
  image: "",
  year: 3,
};

const setup = (props) => {
  const wrapper = shallow(<RecommendedList {...props} />);
  return wrapper;
};

it("should render recommended list", () => {
  const wrapper = setup();
  const recommendedList = findByTestAttr(wrapper, "recommended-list");
  expect(recommendedList.length).toBe(1);
});

//like in FriendList.test.js
it("should have value according to the value props", () => {
  const wrapper = setup(recommended);
  const recommendedListPropValue = findByTestAttr(
    wrapper,
    "recommended-list-object-name"
  ).text();

  expect(recommendedListPropValue).toBe("<Username />");
});
