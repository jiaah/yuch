import { Axios } from './axios';
import * as types from './actionTypes';
import { clearStorage } from '../../localStorage';

/* --- Login --- */
export const userLogin = (username, password, loggedInAt) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'login' });
  try {
    const res = await Axios.post('/auth/login', {
      username,
      password,
    });
    const { id, companyName, isAdmin, refreshToken } = res.data;
    const tokenData = {
      token: res.headers.authorization.split(' ')[1],
      refreshToken,
    };
    dispatch({
      type: types.USER_LOGIN,
      payload: { id, companyName, isAdmin, loggedInAt },
    });
    return tokenData;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'login',
      error: 'Login failed.',
    });
  }
};

export const userLogout = () => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'userLogout' });
  try {
    // await Axios.post('/auth/logout');
    await dispatch({ type: types.USER_LOGOUT, api: 'userLogout' });
    return clearStorage();
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'userLogout',
      error: 'Failed to logout user.',
    });
  }
};

/* --- Admin --- */
// check admin password for security
export const verifyAdminUser = password => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'verifyAdminUser' });
  try {
    await Axios.post('/auth/login/admin', { password });
    return dispatch({ type: types.HTTP_SUCCESS, api: 'verifyAdminUser' });
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'verifyAdminUser',
      error: 'Failed admin user authentication.',
    });
  }
};

// admin user confirmation status
export const handleAdminVerificationStatus = () => ({
  type: types.IS_ADMIN_VERIFIED,
});

/* --- Password --- */
export const changePassword = (id, password, newPassword) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'password' });
  try {
    await Axios.patch('/auth/change/password', {
      id,
      password,
      newPassword,
    });
    return dispatch({ type: types.HTTP_SUCCESS, api: 'password' });
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'password',
      error: 'Changing the password failed.',
    });
  }
};

// reset password by admin. user's current password is not required.
export const resetPassword = (id, newPassword) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'password' });
  try {
    await Axios.patch('/auth/reset/password', { id, newPassword });
    return dispatch({ type: types.HTTP_SUCCESS, api: 'password' });
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'password',
      error: 'Resetting the password failed.',
    });
  }
};

// forgot password
export const resetPasswordWithAccessToken = (
  token,
  newPassword,
) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'password' });
  try {
    await Axios.patch(`/auth/reset/password/${token}`, {
      newPassword,
    });
    return dispatch({ type: types.HTTP_SUCCESS, api: 'password' });
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'password',
      error: 'Changing the password failed.',
    });
  }
};

/* --- Forgot Username/Password --- */
export const findUsernameWithEmail = email => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'findUsername' });
  try {
    const res = await Axios.post('/auth/forgot/username/email', {
      email,
    });
    const { data } = res;
    await dispatch({
      type: types.HTTP_SUCCESS,
      api: 'findUsername',
      payload: data,
    });
    return data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'findUsername',
      error: 'Failed to find user.',
    });
  }
};

export const findUsernameWithContact = contactNo => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'findUsername' });
  try {
    const res = await Axios.post('/auth/forgot/username/contact', {
      contactNo,
    });
    const { data } = res;
    await dispatch({
      type: types.HTTP_SUCCESS,
      api: 'findUsername',
      payload: data,
    });
    return data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'findUsername',
      error: 'Failed to find user.',
    });
  }
};

// forgot password
export const sendVerificationCodeToEmail = (
  username,
  email,
) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'sendVerificationCodeToEmail' });
  try {
    await Axios.post('/auth/forgot/password', {
      username,
      email,
    });
    return dispatch({
      type: types.HTTP_SUCCESS,
      api: 'sendVerificationCodeToEmail',
    });
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'sendVerificationCodeToEmail',
      error: 'Failed to send an email.',
    });
  }
};
