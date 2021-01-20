import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../../actions/users";
import {
  FaHome,
  FaHeart,
  FaSearch,
  FaUserAlt,
  FaSeedling,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const currUser = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : undefined;
  const dispatch = useDispatch();
  const logOutUser = () => {
    dispatch(signOut());
    window.location.reload();
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const activeIcon = (e) => {
    document
      .querySelectorAll(".react-link_header")
      .forEach((icon) => icon.classList.remove("react-link_header_active"));
    if (e.target.classList.contains("react-link_header"))
      e.target.classList.add("react-link_header_active");
    else if (e.target.parentElement.classList.contains("react-link_header"))
      e.target.parentElement.classList.add("react-link_header_active");
  };
  return (
    <div className="header_container">
      <NavLink to="/">
        <FaSeedling className="app_logo" />
      </NavLink>
      <div className="header_icon_container">
        <NavLink
          exact
          className="react-link_header"
          activeClassName="react-link_header_active"
          to="/"
        >
          <FaHome />
        </NavLink>
        <NavLink
          exact
          className="react-link_header"
          activeClassName="react-link_header_active"
          to="/explore"
        >
          <FaHeart />
        </NavLink>
        <NavLink
          exact
          className="react-link_header"
          activeClassName="react-link_header_active"
          to="/search"
        >
          <FaSearch />
        </NavLink>
        <NavLink
          exact
          className="react-link_header"
          activeClassName="react-link_header_active"
          to={`/user/${currUser.username}`}
        >
          <FaUserAlt />
        </NavLink>
      </div>
      <div className="header_settings">
        <FaSignOutAlt onClick={logOutUser} className="header_sign-out" />
      </div>
    </div>
  );
};

export default Header;
