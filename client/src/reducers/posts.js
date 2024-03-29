export default (posts = [], action) => {
  switch (action.type) {
    case "DELETE":
      return posts.filter((post) => post._id !== action.payload);
    case "FETCH_POSTS":
      return action.payload;
    case "LIKE":
    case "UNLIKE":
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "CREATE":
      return [...posts, action.payload];
    default:
      return posts;
  }
};
