import React, { useState } from "react";
import { useSelector } from "react-redux";
import Post from "../Posts/Post";
import "./UserProfile.css";
import Follow from "./Follow";
import Loader from "../Loader/Loader";

const UserProfile = ({ match }) => {
  // FIX THE SCROLL PROBLEM
  window.scrollTo(0, 0);
  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  const currUser = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : undefined;
  const [sort, setSort] = useState(false);
  const user = users.find((user) => user.username === match.params.id);

  const userPosts = user
    ? posts.filter((post) => post.creator === user.username)
    : [];

  let date;
  if (!sort)
    userPosts.sort((a, b) =>
      b.createdAt > a.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0
    );
  console.log(user);
  if (user) date = user.createdAt.split("T")[0];

  const sortNew = () => {
    setSort(false);
  };
  const sortOld = () => {
    setSort(true);
  };
  return user ? (
    <div className="user_profile_container">
      <div className="showcase_img" />

      <div className="user_profile_info">
        <img src={user.avatar} alt="" className="user_profile_avatar" />
        <h2 className="user_profile_username">{user.name}</h2>
        <p>@{user.username}</p>
        {user.username !== currUser.username ? (
          <Follow user={user} currUser={currUser} />
        ) : null}
      </div>
      <div className="user_follow_container">
        <div className="user_follow">
          <p>Following</p>
          <p>{user.following.length}</p>
        </div>
        <div className="user_follow">
          <p>Followers</p>
          <p>{user.followers.length}</p>
        </div>
      </div>
      <div className="sort_posts">
        <button
          className={sort ? "sort_btn" : "sort_btn sort_btn_active"}
          onClick={sortNew}
        >
          Newest
        </button>
        <button
          className={!sort ? "sort_btn" : "sort_btn sort_btn_active"}
          onClick={sortOld}
        >
          Oldest
        </button>
      </div>
      {posts.length === 0 ? (
        <Loader />
      ) : (
        <div className="user_profile_posts">
          {userPosts.map((post) => (
            <Post post={post} key={post._id} currentUser={user} />
          ))}

          <div>
            <h3>
              Joined <span>{date}</span>
            </h3>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="no_user">No user found</div>
  );
};

export default UserProfile;
