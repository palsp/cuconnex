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

export enum activityName {
  ads = "Ads",
  webBuilder = "Web Builder",
  chatBot = "Chatbot",
  coding = "Coding",
  finTech = "FinTech",
  graphic = "Graphic",
  fashion = "Fashion",
  marketing = "Marketing",
  businessCase = "Business Case",
  startup = "Startup",
  ecommerce = "Ecommerce",
  uxui = "UX/UI",
  finance = "Finance",
}

const ActivityBox: React.FC<Props> = (props) => {
  let icon;

  if (props.activityBox.activityName === activityName.ads) {
    icon = <Ads />;
  } else if (props.activityBox.activityName === activityName.webBuilder) {
    icon = <WebBuilder />;
  } else if (props.activityBox.activityName === activityName.chatBot) {
    icon = <Chatbot />;
  } else if (props.activityBox.activityName === activityName.coding) {
    icon = <Coding />;
  } else if (props.activityBox.activityName === activityName.finTech) {
    icon = <FinTech />;
  } else if (props.activityBox.activityName === activityName.graphic) {
    icon = <Graphic />;
  } else if (props.activityBox.activityName === activityName.fashion) {
    icon = <Fashion />;
  } else if (props.activityBox.activityName === activityName.marketing) {
    icon = <Marketing />;
  } else if (props.activityBox.activityName === activityName.businessCase) {
    icon = <Case />;
  } else if (props.activityBox.activityName === activityName.startup) {
    icon = <Startup />;
  } else if (props.activityBox.activityName === activityName.ecommerce) {
    icon = <Ecommerce />;
  } else if (props.activityBox.activityName === activityName.uxui) {
    icon = <UXUI />;
  } else if (props.activityBox.activityName === activityName.finance) {
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
