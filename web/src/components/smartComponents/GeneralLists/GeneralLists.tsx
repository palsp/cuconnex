import classes from "./GeneralLists.module.css";
import React, { useEffect, useState } from "react";
import { IFetchTeam } from "@src/models";
import { Subtitle } from "@dumbComponents/UI";
interface Props {
  events?: {
    "event-name": string;
    bio: string;
    status?: string;
    "start-date": {
      month: number;
      day: number;
      year: number;
      time: {
        hour: number;
        minute: number;
        second: number;
      };
    };
    "end-date": {
      month: number;
      day: number;
      year: number;
      time: {
        hour: number;
        minute: number;
        second: number;
      };
    };
  };
  team?: IFetchTeam;
}
const GeneralLists: React.FC<Props> = (props) => {
  let cssArrayTeam = null;
  let cssArrayEvent = null;

  switch (props.events?.status) {
    case "Open for application":
      cssArrayEvent = [classes.eventstatusDiv];
      break;
    case "Ongoing":
      cssArrayEvent = [classes.eventstatusDiv];
      break;
    case "Upcoming":
      cssArrayEvent = [classes.upcomingDiv];
      break;
    case "Closed":
      cssArrayEvent = [classes.closedDiv];
      break;
    default:
      cssArrayEvent = [classes.nullDiv];
      break;
  }
  let compatibility = "";
  const teamNameForRandom = props.team?.creatorId.slice(0, 2);
  if (props.team) {
    if (teamNameForRandom == "60") {
      cssArrayTeam = [classes.verycompatibleDiv];
      compatibility = "Very compatible with you!";
    } else if (teamNameForRandom == "59") {
      cssArrayTeam = [classes.notcompatibleDiv];
      compatibility = "Not so compatible!";
    } else if (teamNameForRandom == "61") {
      cssArrayTeam = [classes.verycompatibleDiv];
      compatibility = "Very compatible with you";
    } else if (teamNameForRandom == "62") {
      cssArrayTeam = [classes.verycompatibleDiv];
      compatibility = "Very compatible with you!";
    } else if (teamNameForRandom == "63") {
      cssArrayTeam = [classes.compatibleDiv];
      compatibility = "Compatible with you!";
    } else {
      cssArrayTeam = [classes.notcompatibleDiv];
      compatibility = "Not so compatible!";
    }
  } else {
    cssArrayTeam = [classes.notcompatibleDiv];
  }

  const includeTech =
    props.team?.currentRecruitment.toLowerCase().includes("developer") ||
    props.team?.currentRecruitment.toLowerCase().includes("programmer") ||
    props.team?.currentRecruitment.toLowerCase().includes("data") ||
    props.team?.currentRecruitment.toLowerCase().includes("backend") ||
    props.team?.currentRecruitment.toLowerCase().includes("frontend") ||
    props.team?.currentRecruitment.toLowerCase().includes("fullstack") ||
    props.team?.currentRecruitment.toLowerCase().includes("software") ||
    props.team?.currentRecruitment.toLowerCase().includes("hardware");

  const includeBusiness =
    props.team?.currentRecruitment.toLowerCase().includes("business") ||
    props.team?.currentRecruitment.toLowerCase().includes("finance") ||
    props.team?.currentRecruitment.toLowerCase().includes("marketing") ||
    props.team?.currentRecruitment.toLowerCase().includes("accountant") ||
    props.team?.currentRecruitment.toLowerCase().includes("economics") ||
    props.team?.currentRecruitment.toLowerCase().includes("money") ||
    props.team?.currentRecruitment.toLowerCase().includes("market") ||
    props.team?.currentRecruitment.toLowerCase().includes("cashflow") ||
    props.team?.currentRecruitment.toLowerCase().includes("supply") ||
    props.team?.currentRecruitment.toLowerCase().includes("demand");
  const includeDesign =
    props.team?.currentRecruitment.toLowerCase().includes("art") ||
    props.team?.currentRecruitment.toLowerCase().includes("design") ||
    props.team?.currentRecruitment.toLowerCase().includes("web") ||
    props.team?.currentRecruitment.toLowerCase().includes("UI") ||
    props.team?.currentRecruitment.toLowerCase().includes("draw") ||
    props.team?.currentRecruitment.toLowerCase().includes("decorate") ||
    props.team?.currentRecruitment.toLowerCase().includes("video") ||
    props.team?.currentRecruitment.toLowerCase().includes("picture") ||
    props.team?.currentRecruitment.toLowerCase().includes("editor");
  let categoryPrompt = null;
  if (props.team) {
    if (
      includeTech == true &&
      includeBusiness == false &&
      includeDesign == false
    ) {
      categoryPrompt = (
        <div className={classes.categoryContainer}>
          <div className={classes.techcategoryDiv}>Technology</div>
        </div>
      );
    } else if (
      includeTech == true &&
      includeBusiness == true &&
      includeDesign == false
    ) {
      categoryPrompt = (
        <div className={classes.categoryContainer}>
          <div className={classes.techcategoryDiv}>Technology</div>
          <div className={classes.businesscategoryDiv}>Business</div>
        </div>
      );
    } else if (
      includeTech == true &&
      includeBusiness == true &&
      includeDesign == true
    ) {
      categoryPrompt = (
        <div className={classes.categoryContainer}>
          <div className={classes.techcategoryDiv}>Technology</div>
          <div className={classes.businesscategoryDiv}>Business</div>
          <div className={classes.designcategoryDiv}>Design</div>
        </div>
      );
    } else if (
      includeTech == false &&
      includeBusiness == true &&
      includeDesign == true
    ) {
      categoryPrompt = (
        <div className={classes.categoryContainer}>
          <div className={classes.businesscategoryDiv}>Business</div>
          <div className={classes.designcategoryDiv}>Design</div>
        </div>
      );
    } else if (
      includeTech == true &&
      includeBusiness == false &&
      includeDesign == true
    ) {
      categoryPrompt = (
        <div className={classes.categoryContainer}>
          <div className={classes.techcategoryDiv}>Technology</div>
          <div className={classes.designcategoryDiv}>Design</div>
        </div>
      );
    } else {
      categoryPrompt = (
        <div className={classes.notInCategoryDiv}>
          <Subtitle value="Visit team for further info." size="small" />
        </div>
      );
    }
  }
  return (
    <div className={classes.mainDiv}>
      <div className={classes.profileContainer}>
        <div className={classes.profileDiv}> </div>
      </div>
      <div className={classes.textbodyDiv}>
        <div className={classes.eventnameDiv}>
          {props.events?.["event-name"]}
        </div>
        <div className={classes.eventdescriptionDiv}>{props.events?.bio}</div>
        <div className={cssArrayEvent.join(" ")}>{props.events?.status}</div>
        <div className={classes.teamnameDiv}>{props.team?.name}</div>
        <div className={cssArrayTeam.join(" ")}>{compatibility}</div>
        <div className={classes.projectnameDiv}>
          {props.team?.currentRecruitment}
        </div>
        <div className={classes.teamstatusDiv}>
          {props.team?.lookingForMembers}
        </div>
        <div>{categoryPrompt}</div>
      </div>
    </div>
  );
};

export default GeneralLists;
