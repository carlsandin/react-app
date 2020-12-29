import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../actions/users';
import './Login.css';

const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector((state) => state.signin);
    const { userInfo } = user;
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signIn(username, password));
        console.log(user, localStorage, userInfo);
    }
    return (
        <div className="login_container">
            <h1>Login</h1>
            <form onSubmit={submitHandler} className="login_form">
                <input type="text" name="username" placeholder="Username" required value={username} onChange={ e => setUserName(e.target.value)} />
                <input type="password" name="password" placeholder="Password" required value={password} onChange={ e => setPassword(e.target.value)} />
                <button type="submit" className="login_btn">Login</button>
            </form>
        </div>
    );
};

export default Login;