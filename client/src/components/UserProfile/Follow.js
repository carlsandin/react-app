import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { follow, unfollow } from "../../actions/users";

const Follow = ({ user }) => {
  const users = useSelector((state) => state.users);
  const currUser = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : undefined;

  const curr = users.find((user) => user.username === currUser.username);
  let isFollowing = curr
    ? curr.following.find((x) => x === user.username)
    : null;

  const [isFollow, setIsFollow] = useState(isFollowing);
  const dispatch = useDispatch();

  const followUser = () => {
    if (!isFollow) {
      dispatch(
        follow(user._id, currUser.username, currUser.user, user.username)
      );
      setIsFollow(true);
    } else {
      dispatch(
        unfollow(user._id, currUser.username, currUser.user, user.username)
      );
      setIsFollow(false);
    }
  };
  return (
    <div>
      <button className="sort_btn" onClick={followUser}>
        {isFollow ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default Follow;
