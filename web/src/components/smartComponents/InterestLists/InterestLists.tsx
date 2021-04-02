import React from "react";
import InterestList from "@smartComponents/InterestLists/InterestList/InterestList";

import classes from "./InterestLists.module.css";

interface Props {
  type: string;
  selectInterestHandler: (e: string) => any;
}

const businessInterestArray = [
  "Marketing",
  "Business Case",
  "Startup",
  "Ecommerce",
  // "Finance",
];
const technologyInterestArray = [
  "Coding",
  "Web Builder",
  "Chatbot",
  "FinTech",
  // "Blockchain",
];
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
                selectInterestHandlerDiv={(currentState: boolean) => {
                  props.selectInterestHandler(interest);
                }}
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
                selectInterestHandlerDiv={(currentState: boolean) => {
                  props.selectInterestHandler(interest);
                }}
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
                selectInterestHandlerDiv={(currentState: boolean) => {
                  props.selectInterestHandler(interest);
                }}
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
  return (
    <div className={classes.main}>
      <div className={classes.container}>{InterestLists}</div>
    </div>
  );
};

export default InterestLists;
