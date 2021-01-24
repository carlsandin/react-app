import React, { useEffect, useState } from "react";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import Login from "./components/LogIn/Login";
import User from "./components/UserProfile/UserProfile";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { getPosts } from "./actions/posts";
import { getUsers } from "./actions/users";
import Search from "./components/Search/Search";

const App = () => {
  const [darkMode, setDarkMode] = useState(getInitialMode());
  const currUser = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : undefined;
  const dispatch = useDispatch();
  useEffect(() => {
    if (currUser) {
      dispatch(getPosts());
      dispatch(getUsers());
    }
  }, [dispatch]);
  useEffect(() => {
    localStorage.setItem("Darkmode", JSON.stringify(darkMode));
  }, [darkMode]);

  function getInitialMode() {
    return JSON.parse(localStorage.getItem("Darkmode")) || false;
  }

  return currUser ? (
    <Router>
      <div className={darkMode ? "app_container_dark" : "app_container"}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Route exact path="/">
          <Form />
          <Posts />
        </Route>
        <Route path="/user/:id" component={User} />
        <Route exact path="/search" component={Search} />
      </div>
    </Router>
  ) : (
    <Router>
      <Route path="/" component={Login} />
    </Router>
  );
};

export default App;
