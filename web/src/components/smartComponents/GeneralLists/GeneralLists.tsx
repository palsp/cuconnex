import classes from "./GeneralLists.module.css";
import React, { useEffect, useState } from "react";
interface Props {
  event?: {
    name: string;
    description: string;
    status: string;
  };
  team?: {
    name: string;
    compatibility: string;
    projectname: string;
    status: string;
    category: {
      technology: boolean;
      business: boolean;
      design: boolean;
    };
  };
}
const GeneralLists: React.FC<Props> = (props) => {
  let cssArrayTeam = null;
  let cssArrayEvent = null;
  switch (props.event?.status) {
    case "Open for application":
      cssArrayEvent = [classes.eventstatusDiv];
      break;
    case "Ongoing":
      cssArrayEvent = [classes.ongoingDiv];
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
  switch (props.team?.compatibility) {
    case "Very compatible with you!":
      cssArrayTeam = [classes.verycompatibleDiv];
      break;
    case "Compatible with you!":
      cssArrayTeam = [classes.compatibleDiv];
      break;
    case "Not so compatible!":
      cssArrayTeam = [classes.notcompatibleDiv];
      break;
    default:
      cssArrayTeam = [classes.notcompatibleDiv];
      break;
  }
  let categoryPrompt = null;
  if (
    props.team?.category.technology == true &&
    props.team.category.business == false &&
    props.team.category.design == false
  ) {
    categoryPrompt = (
      <div className={classes.categoryContainer}>
        <div className={classes.techcategoryDiv}>Technology</div>
      </div>
    );
  } else if (
    props.team?.category.technology == true &&
    props.team.category.business == true &&
    props.team.category.design == false
  ) {
    categoryPrompt = (
      <div className={classes.categoryContainer}>
        <div className={classes.techcategoryDiv}>Technology</div>
        <div className={classes.businesscategoryDiv}>Business</div>
      </div>
    );
  } else if (
    props.team?.category.technology == true &&
    props.team.category.business == true &&
    props.team.category.design == true
  ) {
    categoryPrompt = (
      <div className={classes.categoryContainer}>
        <div className={classes.techcategoryDiv}>Technology</div>
        <div className={classes.businesscategoryDiv}>Business</div>
        <div className={classes.designcategoryDiv}>Design</div>
      </div>
    );
  } else if (
    props.team?.category.technology == false &&
    props.team.category.business == true &&
    props.team.category.design == true
  ) {
    categoryPrompt = (
      <div className={classes.categoryContainer}>
        <div className={classes.businesscategoryDiv}>Business</div>
        <div className={classes.designcategoryDiv}>Design</div>
      </div>
    );
  } else if (
    props.team?.category.technology == true &&
    props.team.category.business == false &&
    props.team.category.design == true
  ) {
    categoryPrompt = (
      <div className={classes.categoryContainer}>
        <div className={classes.techcategoryDiv}>Technology</div>
        <div className={classes.designcategoryDiv}>Design</div>
      </div>
    );
  } else {
  }
  return (
    <div className={classes.mainDiv}>
      <div className={classes.profileContainer}>
        <div className={classes.profileDiv}> </div>
      </div>
      <div className={classes.textbodyDiv}>
        <div className={classes.eventnameDiv}>{props.event?.name}</div>
        <div className={classes.eventdescriptionDiv}>
          {props.event?.description}
        </div>
        <div className={cssArrayEvent.join(" ")}>{props.event?.status}</div>
        <div className={classes.teamnameDiv}>{props.team?.name}</div>
        <div className={cssArrayTeam.join(" ")}>
          {props.team?.compatibility}
        </div>
        <div className={classes.projectnameDiv}>{props.team?.projectname}</div>
        <div className={classes.teamstatusDiv}>{props.team?.status}</div>
        <div>{categoryPrompt}</div>
      </div>
    </div>
  );
};

export default GeneralLists;
