import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../../test/testUtils";
import FriendLists from "./FriendLists";

const setup = (props) => {
  const wrapper = shallow(<FriendLists {...props} />);
  return wrapper;
};

it("should render username component", () => {
  const wrapper = setup();
  const friendLists = findByTestAttr(wrapper, "friendLists");
  expect(friendLists.length).toBe(1);
});
