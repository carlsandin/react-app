import React, { useEffect } from "react";
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

  return currUser ? (
    <Router>
      <div className="app_container">
        <Route exact path="/">
          <Header />
          <Form />
          <Posts />
        </Route>
        <Route exact path="/user/:id" component={User} />
        <Route exact path="/search">
          <Header />
          <Search />
        </Route>
      </div>
    </Router>
  ) : (
    <Router>
      <Route path="/" component={Login} />
    </Router>
  );
};

export default App;
