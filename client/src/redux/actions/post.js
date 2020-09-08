import api from '../../utils/api';
import { setAlert } from './alert';
import * as actionTypes from './types';

// GET POSTS
export const getPosts = () => async (dispatch) => {
  try {
    const res = await api.get('/posts');
    dispatch({
      type: actionTypes.GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// GET POST
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/posts/${id}`);
    dispatch({
      type: actionTypes.GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// ADD LIKE
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/like/${id}`);
    dispatch({
      type: actionTypes.UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: actionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// REMOVE LIKE
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/unlike/${id}`);
    dispatch({
      type: actionTypes.UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: actionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// DELETE POST
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.delete(`/posts/${id}`);
    dispatch({
      type: actionTypes.DELETE_POST,
      payload: id,
    });
    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: actionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// ADD POST
export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/posts', formData);
    dispatch({
      type: actionTypes.ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: actionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// ADD COMMENT
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/comment/${postId}`, formData);
    dispatch({
      type: actionTypes.ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: actionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// DELETE COMMENT
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: actionTypes.REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: actionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
