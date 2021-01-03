import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../../actions/users";
import "./Login.css";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(signIn(username, password));
    window.location.reload();
  };
  return (
    <div className="login_container">
      <h1>Login</h1>
      <form onSubmit={submitHandler} className="login_form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          value={username.toLowerCase()}
          onChange={(e) => setUserName(e.target.value.toLowerCase())}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login_btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
