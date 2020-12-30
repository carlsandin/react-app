import * as api from '../api';

export const getPosts = () => async (dispatch) => {
     try {
         const { data } = await api.fetchPosts();
         dispatch({ type: 'FETCH_POSTS', payload: data });
     } catch (error) {
         console.log(error.message);
     }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}


export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: 'DELETE', payload: id })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: 'LIKE', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const unLikePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.unLikePost(id);
        dispatch({ type: 'UNLIKE', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}