import React from "react";
import FriendLists from "../../components/smartComponents/FriendLists/FriendLists";

const FriendsPage: React.FC = () => {
  return (
    <div data-test="friends-page">
      <FriendLists />
    </div>
  );
};

export default FriendsPage;
