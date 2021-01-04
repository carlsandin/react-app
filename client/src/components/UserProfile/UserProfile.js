import React, { useState } from "react";
import { useSelector } from "react-redux";
import Post from "../Posts/Post";
import "./UserProfile.css";
import Follow from "./Follow";

const UserProfile = ({ match }) => {
  window.scrollTo(0, 0);
  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  const [sort, setSort] = useState(false);
  const user = users.find((user) => user.username === match.params.id);
  const userPosts = user
    ? posts.filter((post) => post.creator === user.username)
    : [];
  console.log(users[0]);
  let date;
  if (!sort)
    userPosts.sort((a, b) =>
      b.createdAt > a.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0
    );

  if (user) date = user.createdAt.split("T")[0];

  const sortNew = () => {
    setSort(false);
  };
  const sortOld = () => {
    setSort(true);
  };

  return user ? (
    <div className="user_profile_container">
      {!user.welcomeImage ? (
        <div className="showcase_img" />
      ) : (
        <div className="showcase_img" />
      )}
      <div className="user_profile_info">
        <img src={user.avatar} alt="" className="user_profile_avatar" />
        <h2 className="user_profile_username">{user.name}</h2>
        <p>{user.username}</p>
        <Follow user={user} />
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
      <div className="user_profile_posts">
        {userPosts.map((post) => (
          <Post post={post} key={post._id} currentUser={user} />
        ))}
      </div>
      <div>
        <h3>
          Joined <span>{date}</span>
        </h3>
      </div>
    </div>
  ) : (
    <div className="no_user">No user found</div>
  );
};

export default UserProfile;
