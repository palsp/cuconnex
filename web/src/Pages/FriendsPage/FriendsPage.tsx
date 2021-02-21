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
        <ArrowLeft />
        <Heading value="My connections" size="medium" />
      </div>

      <SearchBar value="Search By Name" />
      <FriendLists />
    </div>
  );
};

export default FriendsPage;
