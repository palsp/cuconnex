import React from "react";
import InterestList from "./InterestList/InterestList";

import classes from "./InterestLists.module.css";

interface Props {
  type: string;
}

const businessInterestArray = [
  "Marketing",
  "BusinessCase",
  "Startup",
  "Ecommerce",
];
const technologyInterestArray = ["Coding", "WebBuilder", "ChatBot", "FinTech"];
const designInterestArray = ["Graphic", "UXUI", "Ads", "Fashion"];

const InterestLists: React.FC<Props> = (props) => {
  let InterestLists = null;
  switch (props.type) {
    case "BUSINESS":
      InterestLists = (
        <div className={classes.interestLists} data-test="interest-lists">
          {businessInterestArray.map((interest) => {
            return (
              <InterestList
                data-test="interest-list-business"
                value={interest}
                key={interest}
              />
            );
          })}
        </div>
      );
      break;

    case "TECHNOLOGY":
      InterestLists = (
        <div className={classes.interestLists} data-test="interest-lists">
          {technologyInterestArray.map((interest) => {
            return (
              <InterestList
                data-test="interest-list-technology"
                value={interest}
                key={interest}
              />
            );
          })}
        </div>
      );
      break;
    case "DESIGN":
      InterestLists = (
        <div className={classes.interestLists} data-test="interest-lists">
          {designInterestArray.map((interest) => {
            return (
              <InterestList
                data-test="interest-list-design"
                value={interest}
                key={interest}
              />
            );
          })}
        </div>
      );
      break;
    default:
      InterestLists = <div data-test="interest-lists"></div>;
      break;
  }
  return <div>{InterestLists}</div>;
};

export default InterestLists;