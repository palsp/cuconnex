import React from "react";
import TextWithSubHeading from "@dumbComponents/UI/TextWithSubHeading/TextWithSubHeading";
import classes from "./ActivityBox.module.css";
import {
  Marketing,
  Case,
  Startup,
  Ecommerce,
  Coding,
  WebBuilder,
  Chatbot,
  FinTech,
  Graphic,
  UXUI,
  Ads,
  Fashion,
  Finance,
  Blockchain,
} from "@icons/index";

interface Props {
  activityBox: {
    activityName: string;
    activityPic: any;
    activitySubHeading1: string;
    activitySubHeading2: string;
  };
}

const ActivityBox: React.FC<Props> = (props) => {
  let icon;

  if (props.activityBox.activityName === "Ads") {
    icon = <Ads />;
  } else if (props.activityBox.activityName === "Web Builder") {
    icon = <WebBuilder />;
  } else if (props.activityBox.activityName === "Chatbot") {
    icon = <Chatbot />;
  } else if (props.activityBox.activityName === "Coding") {
    icon = <Coding />;
  } else if (props.activityBox.activityName === "FinTech") {
    icon = <FinTech />;
  } else if (props.activityBox.activityName === "Graphic") {
    icon = <Graphic />;
  } else if (props.activityBox.activityName === "Fashion") {
    icon = <Fashion />;
  } else if (props.activityBox.activityName === "Marketing") {
    icon = <Marketing />;
  } else if (props.activityBox.activityName === "Business Case") {
    icon = <Case />;
  } else if (props.activityBox.activityName === "Startup") {
    icon = <Startup />;
  } else if (props.activityBox.activityName === "Ecommerce") {
    icon = <Ecommerce />;
  } else if (props.activityBox.activityName === "UXUI") {
    icon = <UXUI />;
  } else if (props.activityBox.activityName === "Finance") {
    icon = <Finance />;
  } else {
    icon = <Blockchain />;
  }

  return (
    <div data-test="activity-list" className={classes.flexboxItem}>
      {/* <TextWithSubHeading
        data-test="activity-list-props-value"
        activityBox={props.activityBox}
      /> */}
      <div className={classes.box}>
        <div className={classes.heading}>{props.activityBox.activityName}</div>
        <div className={classes.icon}>{icon}</div>
        <div className={classes.subheading}>
          {/* {props.activityBox.activitySubHeading1} */}
          {/* <br></br> */}
          {/* {props.activityBox.activitySubHeading2} */}
        </div>
      </div>
    </div>
  );
};

export default ActivityBox;
