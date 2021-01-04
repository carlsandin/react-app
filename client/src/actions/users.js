import * as api from "../api";

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers();
    dispatch({ type: "FETCH_USERS", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const signIn = (username, password) => async (dispatch) => {
  try {
    const { data } = await api.logIn(username, password);
    dispatch({ type: "USER_SIGNIN", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const signOut = () => async (dispatch) => {
  try {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
  } catch (error) {
    console.log(error.message);
  }
};

export const follow = (id, username, user_id, following_user) => async (
  dispatch
) => {
  try {
    const { data } = await api.followUser(
      id,
      username,
      user_id,
      following_user
    );
    dispatch({ type: "FOLLOW", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const unfollow = (id, username, user_id, unfollowing_user) => async (
  dispatch
) => {
  try {
    const { data } = await api.unFollowUser(
      id,
      username,
      user_id,
      unfollowing_user
    );
    dispatch({ type: "UNFOLLOW", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
