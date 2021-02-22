import React from "react";
import { Link } from "react-router-dom";
import Heading from "../../components/dumbComponents/UI/Heading/Heading";
import ArrowLeft from "../../components/dumbComponents/UI/Icons/ArrowLeft/ArrowLeft";
import FriendLists from "../../components/smartComponents/FriendLists/FriendLists";
import SearchBar from "../../components/smartComponents/Navigation/SearchBar/SearchBar";
import classes from "./FriendsPage.module.css";
const FriendsPage: React.FC = () => {
  return (
    <div data-test="friends-page">
      <div className={classes.divHeading}>
        <div className={classes.divFixed}>
          <div className={classes.relativeArrow}>
            <Link data-test="friends-page-back-link" to="/">
              <ArrowLeft data-test="friends-page-arrow-left" />
            </Link>
          </div>
          <Heading
            data-test="friends-page-header"
            value="My connections"
            size="medium"
          />
          <SearchBar
            data-test="friends-page-search-bar"
            value="Search By Name"
          />
        </div>
      </div>

      <FriendLists data-test="friends-page-friend-lists" />
    </div>
  );
};

export default FriendsPage;
