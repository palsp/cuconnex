import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FriendLists, SearchBar } from "@smartComponents/index";
import { Heading } from "@dumbComponents/UI/index";
import { ArrowLeft } from "@icons/index";
import { motion } from "framer-motion";
import containerVariants, { IUser } from "@src/models/models";

import classes from "./FriendsPage.module.css";
import { fetchFriendsDataAPI } from "@src/api";

const FriendsPage: React.FC = () => {
  const [friendLists, setFriendLists] = useState<IUser[] | []>([]);
  useEffect(() => {
    fetchFriendsHandler().then((value: IUser[] | []) => setFriendLists(value));
  }, []);
  const fetchFriendsHandler = async () => {
    const friendsData = await fetchFriendsDataAPI();
    console.log("SUCCESS fetchFriendsHandler", friendsData.data);
    return friendsData.data.connections;
  };
  const test = fetchFriendsHandler();
  console.log(test);
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      data-test="friends-page"
    >
      <div className={classes.divHeading}>
        <div className={classes.divFixed}>
          <div className={classes.relativeArrow}>
            <Link data-test="friends-page-back-link" to="/landing">
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
      <div className={classes.listDiv}>
        <FriendLists connections={friendLists} />
      </div>
    </motion.div>
  );
};

export default FriendsPage;
