import api from '../../utils/api';
import * as actionTypes from './types';
import { setAlert } from './alert';
import setAuthToken from '../../utils/setAuthToken';

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await api.get('/auth');

    dispatch({
      type: actionTypes.USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.AUTH_ERROR,
    });
  }
};

//Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/users', formData);
    dispatch({
      type: actionTypes.REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: actionTypes.REGISTER_FAIL,
    });
  }
};
//Login user
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };
  try {
    const res = await api.post('/auth', body);
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: actionTypes.LOGIN_FAIL,
    });
  }
};
//Logout //Clear Profile
export const logout = () => ({ type: actionTypes.LOGOUT });
