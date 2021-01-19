import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../../actions/users";
import {
  FaHome,
  FaHeart,
  FaSearch,
  FaUserAlt,
  FaSeedling,
} from "react-icons/fa";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  console.log(window.location.pathname);
  const currUser = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : undefined;
  const dispatch = useDispatch();
  const logOutUser = () => {
    dispatch(signOut());
    window.location.reload();
  };
  const path = window.location.pathname;

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const activeIcon = (e) => {
    document
      .querySelectorAll(".header_icon")
      .forEach((icon) => icon.classList.remove("header_icon_active"));
    e.target.classList.add("header_icon_active");
    console.log(e.target);
  };
  return (
    <div className="header_container">
      <Link to="/">
        <FaSeedling className="app_logo" />
      </Link>
      <div className="header_icon_container">
        <Link className="react-link" to="/">
          <FaHome
            onClick={activeIcon}
            className="header_icon header_icon_active"
          />
        </Link>
        <Link className="react-link" to="/">
          <FaHeart onClick={activeIcon} className="header_icon" />
        </Link>
        <Link className="react-link" to="/search">
          <FaSearch onClick={activeIcon} className="header_icon" />
        </Link>
        <Link className="react-link" to={`/user/${currUser.username}`}>
          <FaUserAlt onClick={activeIcon} className="header_icon" />
        </Link>
      </div>
      <div className="header_settings"></div>
    </div>
  );
};

export default Header;
