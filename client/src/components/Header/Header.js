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
  FaCog,
} from "react-icons/fa";
import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = ({ darkMode, setDarkMode }) => {
  const doc = document.documentElement;
  const w = window;
  let prevScroll = w.scrollY || doc.scrollTop;
  let curScroll;
  let direction = 0;
  let prevDirection = 0;

  const checkScroll = function () {
    curScroll = w.scrollY || doc.scrollTop;
    if (curScroll > prevScroll) {
      //scrolled up
      direction = 2;
    } else if (curScroll < prevScroll) {
      //scrolled down
      direction = 1;
    }

    if (direction !== prevDirection) {
      toggleHeader(direction, curScroll);
    }

    prevScroll = curScroll;
  };

  let toggleHeader = function (direction, curScroll) {
    const header = document.querySelector(".header_container");
    if (direction === 2 && curScroll > 82) {
      header.classList.add("hide");
      prevDirection = direction;
    } else if (direction === 1) {
      header.classList.remove("hide");
      prevDirection = direction;
    }
  };

  window.addEventListener("scroll", checkScroll);
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
        <FaCog className="header_settings_cog" onClick={toggleMenu} />
        <div className={showMenu ? "settings_menu" : "display_none"}>
          <p>Color Mode</p>
          <input
            checked={darkMode}
            onChange={() => setDarkMode((prevMode) => !prevMode)}
            type="checkbox"
            id="checkbox"
          />
          <label htmlFor="checkbox" />
          <p>Log Out</p>
          <FaSignOutAlt onClick={logOutUser} className="log-out_btn" />
        </div>
      </div>
    </div>
  );
};

export default Header;
