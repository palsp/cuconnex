import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../test/testUtils";
import FriendsPage from "./FriendsPage";

const setup = (props) => {
  const wrapper = shallow(<FriendsPage {...props} />);
  return wrapper;
};

it("should render friends page", () => {
  const wrapper = setup();
  const friendsPage = findByTestAttr(wrapper, "friends-page");
  expect(friendsPage.length).toBe(1);
});

it("should render arrowLeft", () => {
  const wrapper = setup();
  const arrowLeft = findByTestAttr(wrapper, "friends-page-arrow-left");
  expect(arrowLeft.length).toBe(1);
});

it("should render header", () => {
  const wrapper = setup();
  const header = findByTestAttr(wrapper, "friends-page-header");
  expect(header.length).toBe(1);
});

it("should render searchBar", () => {
  const wrapper = setup();
  const searchBar = findByTestAttr(wrapper, "friends-page-search-bar");
  expect(searchBar.length).toBe(1);
});

it("should render backLink", () => {
  const wrapper = setup();
  const backLink = findByTestAttr(wrapper, "friends-page-back-link");
  expect(backLink.length).toBe(1);
});

it("should render friendList", () => {
  const wrapper = setup();
  const friendLists = findByTestAttr(wrapper, "friends-page-friend-lists");
  expect(friendLists.length).toBe(1);
});
