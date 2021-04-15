import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../../test/testUtils";
import ProfilePic from "./ProfilePic";

const setup = (props) => {
  const wrapper = shallow(<ProfilePic {...props} />);
  return wrapper;
};

it("should render interest list", () => {
  const wrapper = setup();
  const profilePic = findByTestAttr(wrapper, "profile-pic");
  expect(profilePic.length).toBe(1);
});

// it("should have value according to the value props", () => {
//   const wrapper = setup({ value: "coding" });
//   const profilePicPropValue = findByTestAttr(
//     wrapper,
//     "profile-pic-props-value"
//   ).text();
//   expect(profilePicPropValue).toBe("coding");
// });
