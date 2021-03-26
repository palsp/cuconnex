import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../test/testUtils";
import FindTeamPage from "./FindTeamPage";

const setup = (props) => {
  const wrapper = shallow(<FindTeamPage {...props} />);
  return wrapper;
};

it("should render find team page", () => {
  const wrapper = setup();
  const findTeamPage = findByTestAttr(wrapper, "find-team-page");
  expect(findTeamPage.length).toBe(1);
});

it("should render arrowLeft", () => {
  const wrapper = setup();
  const arrowLeft = findByTestAttr(wrapper, "find-team-page-arrow-left");
  expect(arrowLeft.length).toBe(1);
});

it("should render header", () => {
  const wrapper = setup();
  const header = findByTestAttr(wrapper, "find-team-page-header");
  expect(header.length).toBe(1);
});

it("should render searchBar", () => {
  const wrapper = setup();
  const searchBar = findByTestAttr(wrapper, "find-team-page-search-bar");
  expect(searchBar.length).toBe(1);
});

it("should render backLink", () => {
  const wrapper = setup();
  const backLink = findByTestAttr(wrapper, "find-team-page-back-link");
  expect(backLink.length).toBe(1);
});

it("should render activity lists", () => {
  const wrapper = setup();
  const activityLists = findByTestAttr(wrapper, "find-team-page-friend-lists");
  expect(activityLists.length).toBe(1);
});
