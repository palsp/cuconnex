import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FriendLists, SearchBar } from "@smartComponents/index";
import { Heading } from "@dumbComponents/UI/index";
import { ArrowLeft } from "@icons/index";
import { motion } from "framer-motion";
import containerVariants, { IUser, IUserFriend } from "@src/models/models";

import classes from "./FriendsPage.module.css";
import { fetchFriendsDataAPI } from "@src/api";
import PageTitle from "@dumbComponents/UI/PageTitle/PageTitle";

interface Props {
  history: {
    goBack: () => void;
  };
}

const FriendsPage: React.FC<Props> = (props) => {
  const [hasSearch, setHasSearch] = useState<boolean>(false);
  const [friendLists, setFriendLists] = useState<IUserFriend[] | []>([]);
  useEffect(() => {
    fetchFriendsHandler().then((value: IUserFriend[] | []) =>
      setFriendLists(value)
    );
  }, []);
  const fetchFriendsHandler = async () => {
    const friendsData = await fetchFriendsDataAPI();
    console.log("SUCCESS fetchFriendsHandler", friendsData.data);
    return friendsData.data.connections;
  };

  const variants = {
    hidden: {
      opacity: 0.85,
      y: 800,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      y: 800,
      transition: {
        duration: 0.3,
      },
    },
  };

  const goBack = () => {
    props.history.goBack();
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      data-test="friends-page"
      className={classes.page}
    >
      <div className={classes.divHeading}>
        <div className={classes.divFixed}>
          <PageTitle
            goBack={goBack}
            size="small-medium"
            text="My Connections"
          />
          <div className={classes.searchDiv}>
            <SearchBar
              data-test="friends-page-search-bar"
              value="Search By Name"
            />
          </div>
        </div>
      </div>
      <div className={classes.listDiv}>
        <FriendLists
          data-test="friends-page-friend-lists"
          connections={friendLists}
        />
      </div>
      {/* Home's work
      <FriendLists
        data-test="friends-page-friend-lists"
        friendLists={mockFriendLists}
      />  */}
    </motion.div>
  );
};

export default FriendsPage;
