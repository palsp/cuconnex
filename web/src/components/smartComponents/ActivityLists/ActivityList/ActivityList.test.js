import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../../../test/testUtils";
import ActivityList from "./ActivityList";

const setup = (props) => {
  const wrapper = shallow(<ActivityList {...props} />);
  return wrapper;
};

const activityBox = {
  activityName: "Law",
  activityPic: "",
};

it("should render activity list", () => {
  const wrapper = setup(activityBox);
  const activityList = findByTestAttr(wrapper, "activity-list");
  expect(activityList.length).toBe(1);
});

it("should have value according to the value props", () => {
  const wrapper = setup(activityBox);
  const activityListPropValue = findByTestAttr(
    wrapper,
    "activity-list-props-value"
  ).text();
  expect(activityListPropValue).toBe("<PicWithText />");
});
