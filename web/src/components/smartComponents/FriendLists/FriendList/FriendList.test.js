import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../../../test/testUtils";
import FriendList from "./FriendList";

const setup = (props) => {
  const wrapper = shallow(<FriendList {...props} />);
  return wrapper;
};

it("should render interest list", () => {
  const wrapper = setup();
  const friendList = findByTestAttr(wrapper, "friend-list");
  expect(friendList.length).toBe(1);
});

it("should have value according to the value props", () => {
  let friendObj = {
    name: "Nat",
    profilePic: "",
    interest: "Marketing, Startup",
    year: 3,
  };
  const wrapper = setup(friendObj);
  const friendListPropValue = findByTestAttr(
    wrapper,
    "friend-list-object-name"
  ).text();
  expect(friendListPropValue).toBe("Nat");
});
