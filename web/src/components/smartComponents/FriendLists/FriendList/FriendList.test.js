import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../../../test/testUtils";
import FriendList from "./FriendList";

const setup = (props) => {
  const wrapper = shallow(<FriendList {...props} />);
  return wrapper;
};

const friend = {
  name: "Nat",
  profilePic: "",
  interest: "Marketing, Startup",
  year: 3,
  image: "/test",
};

it("should render interest list", () => {
  const wrapper = setup(friend);
  const friendList = findByTestAttr(wrapper, "friend-list");
  expect(friendList.length).toBe(1);
});
