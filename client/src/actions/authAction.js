import axios from 'axios';
import * as types from './actionTypes';
import { API_HOST } from '../../config';
import { getToken } from '../../localStorage';

const token = getToken();

export const createUser = userInfo => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'createUser' });
  try {
    const res = await axios.post(
      `${API_HOST}/auth/register`,
      { userInfo },
      {
        headers: { authorization: token },
      },
    );
    const companyName = res.data;
    dispatch({ type: types.HTTP_SUCCESS, api: 'createUser' });
    return companyName;
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'createUser', error });
    throw new Error('Creating a user failed.');
  }
};

export const editUser = userInfo => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'editUser' });
  try {
    const res = await axios.post(
      `${API_HOST}/auth/edit`,
      { userInfo },
      {
        headers: { authorization: token },
      },
    );
    const companyName = res.data;
    dispatch({ type: types.HTTP_SUCCESS, api: 'editUser' });
    return companyName;
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'editUser', error });
    throw new Error('Editing a user failed.');
  }
};

export const changePassword = (id, password, newPassword) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'password' });
  try {
    const res = await axios.post(
      `${API_HOST}/auth/password`,
      { id, password, newPassword },
      {
        headers: { authorization: token },
      },
    );
    const companyName = res.data;
    dispatch({ type: types.HTTP_SUCCESS, api: 'password' });
    return companyName;
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'password', error });
    throw new Error('Changing the password failed.');
  }
};

export const userLogin = (username, password) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'login' });
  try {
    const res = await axios.post(`${API_HOST}/auth/login`, {
      username,
      password,
    });
    const userData = res.data;
    dispatch({ type: types.USER_LOGIN, payload: userData.companyName });
    return userData.token;
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'login', error });
    throw new Error('Login failed.');
  }
};

export const userLogout = () => ({
  type: types.USER_LOGOUT,
});
