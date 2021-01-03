import React from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import Post from "./Post.js";
import { FaRegFrown } from "react-icons/fa";
import "./Post.css";

const Posts = () => {
  const posts = useSelector((state) => state.posts);
  const users = useSelector((state) => state.users);
  const currUser = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : undefined;
  const feed = [];
  const userPosts = posts.filter((x) => x.creator === currUser.username);
  userPosts.forEach((post) => {
    feed.push(post);
  });
  const currentUser = users.find((x) => x.username === currUser.username);
  if (currentUser) {
    if (currentUser.following.length > 0) {
      for (let i = 0; i < currentUser.following.length; i++) {
        let followPosts = posts.filter(
          (x) => x.creator === currentUser.following[i]
        );
        followPosts.forEach((post) => {
          feed.push(post);
        });
      }
    }
  }

  return posts.length === 0 ? (
    <Loader />
  ) : (
    <div className="posts_container">
      {feed
        .sort((a, b) =>
          b.createdAt > a.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0
        )
        .map((post) => (
          <Post post={post} key={post._id} currentUser={currentUser} />
        ))}
      <div className="no_more_posts">
        <FaRegFrown />
        <h2>No more posts</h2>
        <p>Try following more people</p>
      </div>
    </div>
  );
};

export default Posts;
