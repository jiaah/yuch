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

/* --- Keep me logged in --- */
export const keepMeLoggedIn = () => ({
  type: types.KEEP_ME_LOGGED_IN,
});

/* --- Forgot Username/Password --- */
export const sendVerificationCodeToEmail = (
  email,
  valueToFind,
) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'sendVerificationCodeToEmail' });
  try {
    await axios.post(`${API_HOST}/auth/forgot`, {
      email,
      valueToFind,
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
