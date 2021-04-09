import React from "react";
import { Link } from "react-router-dom";

import { Heading, Subtitle } from "@dumbComponents/UI/index";
import { RecommendedLists, SearchBar } from "@smartComponents/index";
import { ArrowLeft } from "@icons/index";

import classes from "./RecruitMemberPage.module.css";

const RecruitMember: React.FC = () => {
  const RecruitMemberPrompt = (
    <>
      <div className={classes.relativeArrow}>
        <Link data-test="recruit-member-page-back-link" to="/Homepage">
          <ArrowLeft data-test="recruit-member-page-arrow-left" />
        </Link>
      </div>
      <div className={classes.head}>
        <Heading
          data-test="recruit-member-page-header"
          value="Recruit Members"
        />
      </div>
      <div className={classes.title}>
        <Heading
          data-test="recruit-member-page-header"
          color="black"
          value="What role do you need"
        />
      </div>
      <div className={classes.title}>
        <span className={classes.title}>For </span>
        <span className={classes.titlepink}>Sukiteenoi</span>
      </div>
      <div>
        <SearchBar
          data-test="recruit-member-page-search-bar"
          value="Search by role"
        />
      </div>
      <div className={classes.title}>
        <Heading
          data-test="recruit-member-page-header"
          value="Recommended for you"
          color="black"
        />
      </div>
      <div className={classes.subtitle}>
        <Subtitle value="People you may know" />
      </div>
      <RecommendedLists data-test="recruit-member-page-friend-lists" />
    </>
  );
  return <div data-test="recruit-member-page">{RecruitMemberPrompt}</div>;
};
export default RecruitMember;
