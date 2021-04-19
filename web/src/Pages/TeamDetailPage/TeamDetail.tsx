import React from "react";
import classes from "./TeamDetail.module.css";
import { Link } from "react-router-dom";

import { Heading } from "@dumbComponents/UI/index";
import { ArrowLeft, Close, Edit, PlusCircle } from "@icons/index";
import {
  ActivityLists,
  Biography,
  EducationLists,
  InterestList,
  MemberPicList,
  ProfileInfo,
  RecruitmentLists,
  TeamActivityLists,
  TeamInfo,
} from "@smartComponents/index";
import mockTeamActivitiesData from "@src/mockData/mockTeamActivitiesData";

const TeamDetail: React.FC = () => {
  // Is user be team owner ?
  const isTeamOwner = true;
  // Is team already exist ? (create team process)
  const isTeamExist = true;
  return (
    <div className={classes.TeamDetail}>
      <div className={classes.header}>
        {isTeamExist ? (
          <div className={classes.relativeArrow}>
            <Link data-test="team-detail-page-back-link" to="/landing">
              <ArrowLeft data-test="team-detail-page-arrow-left" />
            </Link>
          </div>
        ) : (
          <div className={classes.closeLeft}>
            <Close data-test="team-detail-page-close-left" />
          </div>
        )}
        <div className={classes.head}>
          <Heading data-test="team-detail-page-header" value="Team details" />
        </div>
        {isTeamOwner ? (
          <div />
        ) : (
          <div className={classes.closeRight}>
            <Close data-test="team-detail-page-close-right" />
          </div>
        )}
      </div>

      <div className={classes.info}>
        <div className={classes.profileInfo}>
          <TeamInfo name="Suki Tee Noi" isTeamOwner={isTeamOwner} />
        </div>
      </div>

      <div className={classes.recruitment}>
        <RecruitmentLists />
      </div>

      <div className={classes.memberpic}>
        <MemberPicList />
      </div>

      <div className={classes.activity}>
        <TeamActivityLists activity={mockTeamActivitiesData} />
      </div>
    </div>
  );
};

export default TeamDetail;
