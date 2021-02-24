import React from "react";
import { shallow } from "enzyme";
import ActivityLists from "./ActivityLists";
import { findByTestAttr } from "../../../../test/testUtils";

const setup = (props) => {
  const wrapper = shallow(<ActivityLists {...props} />);
  return wrapper;
};

it("should render interest lists", () => {
  const wrapper = setup();
  const activityLists = findByTestAttr(wrapper, "activity-lists");
  expect(activityLists.length).toBe(1);
});
