import axios from 'axios';
import * as types from './actionTypes';
import { API_HOST } from '../../config';
import { getToken } from '../../localStorage';

const token = getToken();

export const userLogin = (username, password) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'login' });
  try {
    const res = await axios.post(`${API_HOST}/auth/login`, {
      username,
      password,
    });
    const { companyName, token } = res.data;
    dispatch({ type: types.USER_LOGIN, payload: companyName });
    return token;
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'login', error });
    throw new Error('Login failed.');
  }
};

export const userLogout = () => ({
  type: types.USER_LOGOUT,
});

export const createUser = userInfo => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'createUser' });
  try {
    await axios.post(
      `${API_HOST}/auth/register`,
      { userInfo },
      {
        headers: { authorization: token },
      },
    );
    return dispatch({ type: types.HTTP_SUCCESS, api: 'createUser' });
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'createUser', error });
    throw new Error('Creating a user failed.');
  }
};

export const editUser = userInfo => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'editUser' });
  try {
    await axios.patch(
      `${API_HOST}/auth/edit/${userInfo.id}`,
      { userInfo },
      {
        headers: { authorization: token },
      },
    );
    return dispatch({ type: types.HTTP_SUCCESS, api: 'editUser' });
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'editUser', error });
    throw new Error('Editing a user failed.');
  }
};

export const changePassword = (id, password, newPassword) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'password' });
  try {
    await axios.patch(
      `${API_HOST}/auth/edit/password/${id}`,
      { id, password, newPassword },
      {
        headers: { authorization: token },
      },
    );
    return dispatch({ type: types.HTTP_SUCCESS, api: 'password' });
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'password', error });
    throw new Error('Changing the password failed.');
  }
};

export const changePasswordByAdmin = (id, newPassword) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'password' });
  try {
    await axios.patch(
      `${API_HOST}/auth/edit/password/${id}/admin`,
      { id, newPassword },
      {
        headers: { authorization: token },
      },
    );
    return dispatch({ type: types.HTTP_SUCCESS, api: 'password' });
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'password', error });
    throw new Error('Changing the password failed.');
  }
};

export const deleteUser = userId => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'deleteUser' });
  try {
    await axios.delete(`${API_HOST}/auth/delete/${userId}`, {
      headers: { authorization: token },
    });
    return dispatch({ type: types.HTTP_SUCCESS, api: 'deleteUser' });
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'deleteUser', error });
    throw new Error('Deleting the user failed.');
  }
};

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
