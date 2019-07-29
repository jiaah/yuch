import axios from 'axios';
import * as types from './actionTypes';
import { API_HOST } from '../../config';

/* --- Login --- */
export const userLogin = (username, password) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'login' });
  try {
    const res = await axios.post(`${API_HOST}/auth/login`, {
      username,
      password,
    });
    const { token, id, companyName, isAdmin } = res.data;

    dispatch({ type: types.USER_LOGIN, payload: { id, companyName, isAdmin } });
    return token;
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'login', error });
    throw new Error('Login failed.');
  }
};

export const userLogout = () => ({
  type: types.USER_LOGOUT,
});

/* --- Admin --- */
// check admin password for security
export const confirmAdminUser = password => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'confirmAdminUser' });
  try {
    await axios.post(`${API_HOST}/auth/login/admin`, { password });
    return dispatch({ type: types.HTTP_SUCCESS, api: 'confirmAdminUser' });
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'confirmAdminUser', error });
    throw new Error('Failed admin user authentication.');
  }
};

/* --- Password --- */
export const changePassword = (id, password, newPassword) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'password' });
  try {
    await axios.patch(`${API_HOST}/auth/change/password`, {
      id,
      password,
      newPassword,
    });
    return dispatch({ type: types.HTTP_SUCCESS, api: 'password' });
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'password', error });
    throw new Error('Changing the password failed.');
  }
};

// reset password by admin. user's current password is not required.
export const resetPassword = (id, newPassword) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'password' });
  try {
    await axios.patch(`${API_HOST}/auth/reset/password`, { id, newPassword });
    return dispatch({ type: types.HTTP_SUCCESS, api: 'password' });
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'password', error });
    throw new Error('Changing the password failed.');
  }
};

// forgot password
export const resetPasswordWithAccessToken = (
  token,
  newPassword,
) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'password' });
  try {
    await axios.patch(`${API_HOST}/auth/reset/password/${token}`, {
      newPassword,
    });
    return dispatch({ type: types.HTTP_SUCCESS, api: 'password' });
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'password', error });
    throw new Error('Changing the password failed.');
  }
};

/* --- Keep me logged in --- */
export const keepMeLoggedIn = () => ({
  type: types.KEEP_ME_LOGGED_IN,
});

/* --- Forgot Username/Password --- */
export const findUsername = email => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'findUsername' });
  try {
    const res = await axios.post(`${API_HOST}/auth/forgot/username`, {
      email,
    });
    const { data } = res;
    await dispatch({
      type: types.HTTP_SUCCESS,
      api: 'findUsername',
      payload: data,
    });
    return data.username;
  } catch (error) {
    dispatch({
      type: types.HTTP_FAILURE,
      api: 'findUsername',
      error,
    });
    throw new Error('Failed to find user.');
  }
};

// forgot password
export const sendVerificationCodeToEmail = (
  username,
  email,
) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'sendVerificationCodeToEmail' });
  try {
    await axios.post(`${API_HOST}/auth/forgot/password`, {
      username,
      email,
    });
    return dispatch({
      type: types.HTTP_SUCCESS,
      api: 'sendVerificationCodeToEmail',
    });
  } catch (error) {
    dispatch({
      type: types.HTTP_FAILURE,
      api: 'sendVerificationCodeToEmail',
      error,
    });
    throw new Error('Failed to send email.');
  }
};
