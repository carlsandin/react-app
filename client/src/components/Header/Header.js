import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../../actions/users";
import { FaHome, FaHeart, FaSearch, FaUserAlt } from "react-icons/fa";
import "./Header.css";
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
      <Link className="react-link" to="/">
        <FaHome className="header_icon header_icon_active" />
      </Link>
      <Link className="react-link" to="/">
        <FaHeart className="header_icon" />
      </Link>
      <Link className="react-link" to="/search">
        <FaSearch className="header_icon" />
      </Link>
      <Link className="react-link" to={`/${currUser.username}`}>
        <FaUserAlt className="header_icon" />
      </Link>
    </div>
  );
};

export default Header;
