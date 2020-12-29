import React from 'react';

const Users = ({ user }) => {
    console.log(user, 'hej');
    return (
        <div>
            <img src={user.avatar} className="post_icon_img" />
            <h2>{user.username}</h2>
        </div>
    );
};

export default Users;