export default (users = [], action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return action.payload;
    case "FOLLOW":
    case "UNFOLLOW":
      return users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    default:
      return users;
  }
};
