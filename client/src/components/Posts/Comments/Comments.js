import React, { useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import "./Comments.css";

const Comments = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const comments = () => {
    setShowComments(!showComments);
  };
  return (
    <div>
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
          showComments
            ? "comment_input_container display_grid"
            : "comment_input_container"
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

export default Comments;
