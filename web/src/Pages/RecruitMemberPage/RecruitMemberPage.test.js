import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../test/testUtils";
import RecruitMemberPage from "./RecruitMemberPage";

const setup = (props) => {
  const wrapper = shallow(<RecruitMemberPage {...props} />);
  return wrapper;
};

it("should render find team page", () => {
  const wrapper = setup();
  const recruitMemberPage = findByTestAttr(wrapper, "recruit-member-page");
  expect(recruitMemberPage.length).toBe(1);
});

it("should render arrowLeft", () => {
  const wrapper = setup();
  const arrowLeft = findByTestAttr(wrapper, "recruit-member-page-arrow-left");
  expect(arrowLeft.length).toBe(1);
});

it("should render backLink", () => {
  const wrapper = setup();
  const backLink = findByTestAttr(wrapper, "recruit-member-page-back-link");
  expect(backLink.length).toBe(1);
});
//First header is "Recruit members"
//Second header is "What role do you need for Suki Tee noi?"
//Third header is "Recommended for you"
it("should render 3 header", () => {
  const wrapper = setup();
  const header = findByTestAttr(wrapper, "recruit-member-page-header");
  expect(header.length).toBe(3);
});

it("should render searchBar", () => {
  const wrapper = setup();
  const searchBar = findByTestAttr(wrapper, "recruit-member-page-search-bar");
  expect(searchBar.length).toBe(1);
});

it("should render recommended lists", () => {
  const wrapper = setup();
  const recommendeLists = findByTestAttr(
    wrapper,
    "recruit-member-page-friend-lists"
  );
  expect(recommendeLists.length).toBe(1);
});
