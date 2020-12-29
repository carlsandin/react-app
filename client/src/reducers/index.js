import { combineReducers } from 'redux';
import posts from './posts';
import users from './users';
import signin from './signin';


export default combineReducers({ users, posts, signin });

 /*JSON.parse(localStorage.getItem('userInfo')) */ 