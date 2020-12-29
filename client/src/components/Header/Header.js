import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../actions/users';
import { FaChevronDown } from 'react-icons/fa';
import './Header.css';


const Header = () => {
    const user = useSelector((state) => state.signin);
    const [showMenu, setShowMenu] = useState(false);
    const { userInfo } = user;
    const dispatch = useDispatch();
    const logOutUser = () => {
        dispatch(signOut());
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }
    return(
        <div className="header_container">
               <h3 className="header_logo">Project</h3>
               <div className="header_user">
               <img className="post_icon_img" />          
               <h3>{userInfo.username}</h3>
               <div className="menu_container">
               <FaChevronDown className={ showMenu ? "arrow_up" : "arrow_down" } onClick={toggleMenu} />
               <ul className={ showMenu ? "user_menu display" : "user_menu"}>
               <li>Edit profile</li>
               <li onClick={logOutUser}>Logout</li>
               </ul>
               </div>
               </div>
            </div> 
    )
};

export default Header;