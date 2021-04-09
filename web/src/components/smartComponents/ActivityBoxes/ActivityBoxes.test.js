import React from "react";
import { shallow } from "enzyme";
import ActivityBoxes from "./ActivityBoxes";
import { findByTestAttr } from "../../../../test/testUtils";

const setup = (props) => {
  const wrapper = shallow(<ActivityBoxes {...props} />);
  return wrapper;
};

it("should render activity boxes", () => {
  const wrapper = setup();
  const activityBoxes = findByTestAttr(wrapper, "activity-boxes");
  expect(activityBoxes.length).toBe(1);
});
