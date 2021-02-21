import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../../../test/testUtils";
import FriendList from "./FriendList";
import Username from "../../../dumbComponents/UI/Username/Username";

const setup = (props) => {
  const wrapper = shallow(<FriendList {...props} />);
  return wrapper;
};

const friend = {
  name: "Nat",
  profilePic: "",
  interest: "Marketing, Startup",
  year: 3,
};

it("should render interest list", () => {
  const wrapper = setup(friend);
  const friendList = findByTestAttr(wrapper, "friend-list");
  expect(friendList.length).toBe(1);
});

it("should have value according to the value props", () => {
  const wrapper = setup(friend);
  const friendListPropValue = findByTestAttr(
    wrapper,
    "friend-list-object-name"
  ).text();

  expect(friendListPropValue).toBe("<Username />");
});
