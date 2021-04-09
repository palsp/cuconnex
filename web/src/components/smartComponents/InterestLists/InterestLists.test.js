import React from "react";
import { shallow } from "enzyme";
import InterestLists from "./InterestLists";
import { findByTestAttr } from "../../../../test/testUtils";

const setup = (props) => {
  const wrapper = shallow(<InterestLists {...props} />);
  return wrapper;
};

it("should render interest lists", () => {
  const wrapper = setup();
  const interestLists = findByTestAttr(wrapper, "interest-lists");
  expect(interestLists.length).toBe(1);
});

describe("3 types of interest list", () => {
  beforeEach(() => {});
  it("should render list of interest for BUSINESS", () => {
    const wrapper = setup({ type: "BUSINESS" });
    const interestListBusiness = findByTestAttr(
      wrapper,
      "interest-list-business"
    );
    expect(interestListBusiness.length).toBe(4);
  });
  it("should render list of interest for TECHNOLOGY", () => {
    const wrapper = setup({ type: "TECHNOLOGY" });
    const interestListTechnology = findByTestAttr(
      wrapper,
      "interest-list-technology"
    );
    expect(interestListTechnology.length).toBe(4);
  });
  it("should render list of interest for DESIGN", () => {
    const wrapper = setup({ type: "DESIGN" });
    const interestListDesign = findByTestAttr(wrapper, "interest-list-design");
    expect(interestListDesign.length).toBe(4);
  });
});
