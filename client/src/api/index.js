import axios from 'axios';

const url = 'http://localhost:5000/posts';
const users = 'http://localhost:5000/users';
const signIn = 'http://localhost:5000/signIn';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);


export const fetchUsers = () => axios.get(users);
export const logIn = (username, password) => axios.post(signIn, { username, password });