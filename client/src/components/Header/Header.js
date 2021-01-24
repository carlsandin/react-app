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
