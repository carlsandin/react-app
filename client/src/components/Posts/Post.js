import React, { useState } from "react";
import moment from "moment";
import "./Post.css";
import { useDispatch } from "react-redux";
import { deletePost, likePost, unLikePost } from "../../actions/posts";
import { FaHeart, FaRegTrashAlt, FaRegCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Post = ({ post, currentUser }) => {
  const [editPost, setEditPost] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const currUser = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : undefined;
  const dispatch = useDispatch();

  const updateLike = () => {
    setLiked(!liked);
    if (!liked) {
      dispatch(likePost(post._id));
    } else if (liked) {
      dispatch(unLikePost(post._id));
    }
  };

  const showSettings = () => {
    setEditPost(!editPost);
  };

  const comments = () => {
    setShowComments(!showComments);
  };
  return (
    <div className="post_card">
      <div className="post_header">
        <div className="post_header_top">
          <div className="post_creator">
            <Link className="link" to={`/${post.creator}`}>
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
          <p>{post.likeCount}</p>
        </div>
        <p>{moment(post.createdAt).fromNow()}</p>
      </div>
      <div className="comment_container">
        <div className="comment" onClick={comments}>
          <FaRegCommentAlt />
          <p>Comment</p>
        </div>
        <div className="comment_count">
          <p>{post.comments.length} Comments</p>
        </div>
      </div>
      <div
        className={
          showComments ? "input_container display_grid" : "input_container"
        }
      >
        <input
          type="text"
          name="comment"
          placeholder="Comment..."
          className={showComments ? "comment_input display" : "comment_input"}
        />
      </div>
    </div>
  );
};

export default Post;
