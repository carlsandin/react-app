import React, { useState } from 'react';
import moment from 'moment';
import './Post.css';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost } from '../../actions/posts';
import { FaHeart, FaRegTrashAlt, FaRegCommentAlt } from 'react-icons/fa';

const Post = ({ post, currentUser }) => {
    const [editPost, setEditPost] = useState(false);
    const [liked, setLiked] = useState(false);
    const user = useSelector((state) => state.signin);
    const { userInfo } = user;
    const dispatch = useDispatch();

    const updateLike = () => {
        setLiked(!liked);
        dispatch(likePost(post._id));
    }

    const showSettings = () => {
        setEditPost(!editPost);
    }
    return(

        <div className="post_card">
            <div className="post_header">
            <div className="post_header_top">
                <div className="post_creator">
                 <img className="post_icon_img" src={currentUser.avatar} alt="" />
                 <h3>{post.creator}</h3>
                </div>
                { userInfo.username === post.creator 
                ? <div className="post_settings" onClick={showSettings}><div className="dot" /><div className="dot" /><div className="dot" /></div> 
                : null }
                { userInfo.username === post.creator 
                ? <div className={editPost ? "change_post display" : "change_post"}><li onClick={() => dispatch(deletePost(post._id))}><FaRegTrashAlt /> Delete</li><div className="arrow"></div></div>
                : null }
            </div>
            { post.message.startsWith('http') ? <a href={post.message} className="post_message">{post.message}</a> : <p className="post_message">{post.message}</p>}
            </div>
            { post.selectedFile ? ( <img className="post_img" src={post.selectedFile} alt="" /> ) : <div /> }
            <div className={ !post.selectedFile ? "post_footer" : "post_footer border_top" }>
            <div className="post_likes">
            <FaHeart className={ liked ? "like_btn liked" : "like_btn" } onClick={updateLike} />
            <p>{post.likeCount}</p>
            </div>
            <p>{moment(post.createdAt).fromNow()}</p>
            </div>
            <div className="comment_container">
                <div className="comment">
                <FaRegCommentAlt />
                <p>Comment</p>
                </div>
                <div className="comment_count"><p>{post.comments.length} Comments</p></div>
            </div>
            <div className="input_container">
            <input type="text" name="comment" placeholder="Comment..." className="comment_input" />
            </div>
            
        </div>
    
    )
};

export default Post;
