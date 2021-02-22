import React from "react";
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
            <ArrowLeft />
          </div>
          <Heading value="My connections" size="medium" />
          <SearchBar value="Search By Name" />
        </div>
      </div>

      <FriendLists />
    </div>
  );
};

export default FriendsPage;
