import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../../../test/testUtils";
import ActivityBox from "./ActivityBox";

const setup = (props) => {
  const wrapper = shallow(<ActivityBox {...props} />);
  return wrapper;
};

const activityBox = {
  activityName: "Law",
  activityPic: "",
};

it("should render activity box", () => {
  const wrapper = setup(activityBox);
  const activityBoxRender = findByTestAttr(wrapper, "activity-box");
  expect(activityBoxRender.length).toBe(1);
});

it("should have value according to the value props", () => {
  const wrapper = setup(activityBox);
  const activityBoxPropValue = findByTestAttr(
    wrapper,
    "activity-box-props-value"
  ).text();
  expect(activityBoxPropValue).toBe("<PicWithText />");
});
