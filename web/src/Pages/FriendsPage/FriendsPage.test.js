import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../test/testUtils";
import FriendsPage from "./FriendsPage";

const setup = (props) => {
  const wrapper = shallow(<FriendsPage {...props} />);
  return wrapper;
};

it("should render username component", () => {
  const wrapper = setup();
  const friendsPage = findByTestAttr(wrapper, "friends-page");
  expect(friendsPage.length).toBe(1);
});
