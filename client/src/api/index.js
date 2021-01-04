import axios from "axios";

const url = "http://localhost:5000/posts";
const users = "http://localhost:5000/users";
const signIn = "http://localhost:5000/signIn";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id, username) =>
  axios.patch(`${url}/${id}/likePost`, { username });
export const unLikePost = (id, username) =>
  axios.patch(`${url}/${id}/unLikePost`, { username });

export const fetchUsers = () => axios.get(users);
export const logIn = (username, password) =>
  axios.post(signIn, { username, password });

export const followUser = (id, username, user_id, following_user) =>
  axios.patch(`${users}/${id}/follow`, { username, user_id, following_user });
export const unFollowUser = (id, username, user_id, unfollowing_user) =>
  axios.patch(`${users}/${id}/unfollow`, {
    username,
    user_id,
    unfollowing_user,
  });
