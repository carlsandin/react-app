import React, { useEffect } from "react";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import Login from "./components/LogIn/Login";
import User from "./components/UserProfile/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import { getPosts } from "./actions/posts";
import { getUsers } from "./actions/users";

const App = () => {
  const user = useSelector((state) => state.signin);
  const { userInfo } = user;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
    dispatch(getUsers());
  }, [dispatch]);
  return userInfo ? (
    <Router>
      <div className="app_container">
        <Header />
        <Route exact path="/">
          <Form />
          <Posts />
        </Route>
        <Route path="/:id" component={User} />
      </div>
    </Router>
  ) : (
    <Router>
      <Route path="/" component={Login} />
    </Router>
  );
};

export default App;
