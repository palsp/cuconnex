import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../../../test/testUtils";
import SearchBar from "./SearchBar";

const setup = (props) => {
  const wrapper = shallow(<SearchBar {...props} />);
  return wrapper;
};

it("should render search bar", () => {
  const wrapper = setup();
  const searchBar = findByTestAttr(wrapper, "search-bar");
  expect(searchBar.length).toBe(1);
});

// it("should have value according to the value props", () => {
//   const wrapper = setup();
//   const friendListPropValue = findByTestAttr(
//     wrapper,
//     "friend-list-object-name"
//   ).text();

//   expect(friendListPropValue).toBe("<Username />");
// });
