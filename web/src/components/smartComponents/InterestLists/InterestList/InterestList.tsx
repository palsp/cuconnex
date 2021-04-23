import { AppLogo, Logo } from "@dumbComponents/UI";
import React, { useState } from "react";
import classes from "./InterestList.module.css";
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
  value: string;
  selectInterestHandlerDiv?: any;
}

const InterestList: React.FC<Props> = (props) => {
  const [clicked, setClicked] = useState(false);
  let icon;
  const interestClickHandler = () => {
    setClicked((prevState) => !prevState);
  };

  // const imgCSS = [classes.interestImage];
  // if (props.value) {
  //   imgCSS.push(classes[props.value.split(" ").join("")]);
  // }

  // if (clicked) {
  //   imgCSS.push(classes["isClicked"]);
  // }

  const btnCSS = [classes.interest];
  if (clicked) {
    btnCSS.push(classes["isClicked"]);
  }

  if (props.value === "Ads") {
    icon = <Ads />;
  } else if (props.value === "Web Builder") {
    icon = <WebBuilder />;
  } else if (props.value === "Chatbot") {
    icon = <Chatbot />;
  } else if (props.value === "Coding") {
    icon = <Coding />;
  } else if (props.value === "FinTech") {
    icon = <FinTech />;
  } else if (props.value === "Graphic") {
    icon = <Graphic />;
  } else if (props.value === "Fashion") {
    icon = <Fashion />;
  } else if (props.value === "Marketing") {
    icon = <Marketing />;
  } else if (props.value === "Business Case") {
    icon = <Case />;
  } else if (props.value === "Startup") {
    icon = <Startup />;
  } else if (props.value === "Ecommerce") {
    icon = <Ecommerce />;
  } else if (props.value === "UXUI") {
    icon = <UXUI />;
  } else if (props.value === "Finance") {
    icon = <Finance />;
  } else {
    icon = <Blockchain />;
  }

  return (
    <div
      onClick={() => props.selectInterestHandlerDiv(clicked)}
      data-test="interest-list"
      className={classes.interestList}
    >
      <div onClick={interestClickHandler} className={btnCSS.join(" ")}>
        <div className={classes.icon}>{icon}</div>
        <div className={classes.text}>
          <p className={classes.interestP} data-test="interest-list-props-value">{props.value + " "}</p>
        </div>
      </div>
    </div>
  );
};

export default InterestList;
