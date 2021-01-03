import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../../actions/users";
import { FaChevronDown } from "react-icons/fa";
import "./Header.css";
import Search from "./Search";
import { Link } from "react-router-dom";

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
  return (
    <div className="header_container">
      <Search />
      <Link className="react-link" to="/">
        <h3 className="header_logo">Project</h3>
      </Link>
      <div className="header_user">
        <img className="post_icon_img" alt="" />
        <h3>{currUser.username}</h3>
        <div className="menu_container">
          <FaChevronDown
            className={showMenu ? "arrow_up" : "arrow_down"}
            onClick={toggleMenu}
          />
          <ul className={showMenu ? "user_menu display" : "user_menu"}>
            <li>Edit profile</li>
            <li onClick={logOutUser}>Logout</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
