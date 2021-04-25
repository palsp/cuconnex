import React from "react";
import { Link } from "react-router-dom";

import { FriendLists, SearchBar } from "@smartComponents/index";
import { Heading } from "@dumbComponents/UI/index";
import { ArrowLeft } from "@icons/index";
import { motion } from "framer-motion";
import containerVariants from "@src/models/models";

import classes from "./FriendsPage.module.css";

const FriendsPage: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      exit="exit"
      data-test="friends-page"
    >
      <div className={classes.divHeading}>
        <div className={classes.divFixed}>
          <div className={classes.relativeArrow}>
            <Link
              data-test="friends-page-back-link"
              to={{ pathname: "/landing", state: { hamburgerOn: true } }}
            >
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
    </motion.div>
  );
};

export default FriendsPage;
