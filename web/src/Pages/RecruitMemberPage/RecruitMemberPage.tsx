import classes from "./RecruitMemberPage.module.css";
import React from "react";
import Heading from "../../components/dumbComponents/UI/Heading/Heading";
import RecommendedLists from "../../components/smartComponents/RecommendedLists/RecommendedLists";
import SearchBar from "../../components/smartComponents/Navigation/SearchBar/SearchBar";
import Subtitle from "../../components/dumbComponents/UI/Subtitle/Subtitle";
import ArrowLeft from "../../components/dumbComponents/UI/Icons/ArrowLeft/ArrowLeft";
import { Link } from "react-router-dom";
const RecruitMember: React.FC = () => {
  let RecruitMemberPrompt = (
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
