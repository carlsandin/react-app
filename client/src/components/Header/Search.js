import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const allUsers = useSelector((state) => state.users);
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
      <input
        type="text"
        name="search"
        value={query}
        placeholder="Search Users"
        className="search_input"
        autoComplete="off"
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      {query.length > 0 ? (
        <ul className="search_results">
          {users.length === 0 ? (
            <li className="user_result">No users found</li>
          ) : (
            users.map((user) => (
              <Link
                to={`/${user.username}`}
                onClick={resetQuery}
                key={user.username}
              >
                <li className="user_result">
                  <img src={user.avatar} alt="" className="user_avatar" />
                  {user.username}
                </li>
              </Link>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default Search;
