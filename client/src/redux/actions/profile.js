import api from '../../utils/api';
import * as actionTypes from './types';
import { setAlert } from './alert';

//get current profile of the loggedin user
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/me');
    dispatch({
      type: actionTypes.GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//GET ALL PROFILES
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_PROFILE });
  try {
    const res = await api.get('/profile');
    dispatch({
      type: actionTypes.GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//GET PROFILE BY ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/user/${userId}`);
    dispatch({
      type: actionTypes.GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//GET GITHUB REPOS
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/github/${username}`);
    dispatch({
      type: actionTypes.GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.NO_REPOS,
    });
  }
};
//create or update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const res = await api.post('/profile', formData);
    dispatch({
      type: actionTypes.GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// ADD EXPERIENCE
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const res = await api.put('/profile/experience', formData);
    dispatch({
      type: actionTypes.UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience Added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// ADD EDUCATION
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const res = await api.put('/profile/education', formData);
    dispatch({
      type: actionTypes.UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education Added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//DELETE EXPERIENCE
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/experience/${id}`);
    dispatch({
      type: actionTypes.UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//DELETE Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/education/${id}`);
    dispatch({
      type: actionTypes.UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: actionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//DELETE ACCOUNT AND PROFILE
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await api.delete('/profile');

      dispatch({ type: actionTypes.CLEAR_PROFILE });
      dispatch({ type: actionTypes.ACCOUNT_DELETED });
      dispatch(setAlert('Your Account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
