import React, { useEffect, useState } from 'react';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import Header from './components/Header/Header';
import Login from './components/LogIn/Login';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import { getPosts } from './actions/posts';
import { getUsers } from './actions/users';

const App = () => {
    const user = useSelector((state) => state.signin);
    const { userInfo } = user;
    const [currentUser, setUser] = useState(userInfo);
    const dispatch = useDispatch();
    const test = JSON.parse(localStorage.getItem('userInfo'));
    console.log(test);
    useEffect(() => {
      dispatch(getPosts());
      dispatch(getUsers());
    }, [dispatch]);
    return userInfo ? (
        <div className="app_container">
            <Header />
            <Form />
            <Posts />
        </div>
    ) : (
        <Login /> 
    )
}

export default App;