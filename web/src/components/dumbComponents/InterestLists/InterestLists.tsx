import React from "react";
import InterestList from "./InterestList/InterestList";

import classes from "./InterestLists.module.css";

interface Props {
  type: string;
}

const InterestLists: React.FC<Props> = (props) => {
  let InterestLists = null;
  switch (props.type) {
    case "BUSINESS":
      InterestLists = (
        <div className={classes.interestLists} data-test="interest-lists">
          <InterestList data-test="interest-list-business" value="Marketing" />
          <InterestList
            data-test="interest-list-business"
            value="BusinessCase"
          />
          <InterestList data-test="interest-list-business" value="Startup" />
          <InterestList data-test="interest-list-business" value="Ecommerce" />
        </div>
      );
      break;

    case "TECHNOLOGY":
      InterestLists = (
        <div className={classes.interestLists} data-test="interest-lists">
          <InterestList data-test="interest-list-technology" value="Coding" />
          <InterestList
            data-test="interest-list-technology"
            value="WebBuilder"
          />
          <InterestList data-test="interest-list-technology" value="ChatBot" />
          <InterestList data-test="interest-list-technology" value="FinTech" />
        </div>
      );
      break;
    case "DESIGN":
      InterestLists = (
        <div className={classes.interestLists} data-test="interest-lists">
          <InterestList data-test="interest-list-design" value="Graphic" />
          <InterestList data-test="interest-list-design" value="UX/UI" />
          <InterestList data-test="interest-list-design" value="Ads" />
          <InterestList data-test="interest-list-design" value="Fashion" />
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
