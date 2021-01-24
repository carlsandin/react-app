import React, { useState } from "react";
import moment from "moment";
import "./Post.css";
import { useDispatch } from "react-redux";
import { deletePost, likePost, unLikePost } from "../../actions/posts";
import { FaHeart, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Comments from "./Comments/Comments";

// MAKE COMMENTS COMPONENT, IMPLEMENT COMMENTING

const Post = ({ post, currentUser }) => {
  const [editPost, setEditPost] = useState(false);
  const currUser = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : undefined;
  const dispatch = useDispatch();
  const liked = post.likedBy.find((user) => user === currUser.username);
  const updateLike = () => {
    if (!liked) {
      dispatch(likePost(post._id, currUser.username));
    } else if (liked) {
      dispatch(unLikePost(post._id, currUser.username));
    }
  };

  const showSettings = () => {
    setEditPost(!editPost);
  };

  return (
    <div className="post_card">
      <div className="post_header">
        <div className="post_header_top">
          <div className="post_creator">
            <Link className="link" to={`/user/${post.creator}`}>
              <img className="user_avatar" src={currentUser.avatar} alt="" />
              <h3>{post.creator}</h3>
            </Link>
          </div>
          {currUser.username === post.creator ? (
            <div className="post_settings" onClick={showSettings}>
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>
          ) : null}
          {currUser.username === post.creator ? (
            <div className={editPost ? "change_post display" : "change_post"}>
              <li onClick={() => dispatch(deletePost(post._id))}>
                <FaRegTrashAlt /> Delete
              </li>
              <div className="arrow"></div>
            </div>
          ) : null}
        </div>
        {post.message.startsWith("http") ? (
          <a href={post.message} className="post_message">
            {post.message}
          </a>
        ) : (
          <p className="post_message">{post.message}</p>
        )}
      </div>
      {post.selectedFile ? (
        <img className="post_img" src={post.selectedFile} alt="" />
      ) : (
        <div />
      )}
      <div
        className={
          !post.selectedFile ? "post_footer" : "post_footer border_top"
        }
      >
        <div className="post_likes">
          <FaHeart
            className={liked ? "like_btn liked" : "like_btn"}
            onClick={updateLike}
          />
          <p>{post.likedBy.length}</p>
        </div>
        <p>{moment(post.createdAt).fromNow()}</p>
      </div>
      <Comments post={post} />
    </div>
  );
};

export default Post;
