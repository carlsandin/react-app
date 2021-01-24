import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Search.css";
import { FaTimes } from "react-icons/fa";
import Follow from "../UserProfile/Follow";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const allUsers = useSelector((state) => state.users);
  const currUser = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : undefined;
  useEffect(() => {
    setUsers(
      allUsers.filter((user) => {
        return (
          user.username.toLowerCase().includes(query) ||
          user.name.toLowerCase().includes(query)
        );
      })
    );
  }, [query]);

  const resetQuery = () => {
    setQuery("");
  };
  return (
    <div className="search_container">
      <FaTimes
        onClick={resetQuery}
        className={query.length > 0 ? "clear_search-input" : "display_none"}
      />
      <input
        type="text"
        name="search"
        value={query}
        placeholder="Search Users"
        className={
          query.length > 0 ? "search_input search_input_focus" : "search_input"
        }
        autoComplete="off"
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      {query.length > 0 ? (
        <ul className="search_results">
          {users.length === 0 ? (
            <li className="user_result">No users found</li>
          ) : (
            users.map((user) => (
              <div className="user_result">
                <Link
                  to={`/user/${user.username}`}
                  onClick={resetQuery}
                  key={user.username}
                >
                  <li>
                    <img src={user.avatar} alt="" className="user_avatar" />
                    {user.username}
                  </li>
                </Link>
                {user.username === currUser.username ? null : (
                  <Follow user={user} currUser={currUser} />
                )}
              </div>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default Search;
