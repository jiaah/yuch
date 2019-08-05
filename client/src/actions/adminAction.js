import axios from 'axios';
import * as types from './actionTypes';
import { API_HOST } from '../../config';
import { getToken } from '../../localStorage';

const token = getToken();

/* --- Admin --- */
// admin account
export const getAdmin = id => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getAdmin' });
  try {
    const res = await axios.get(`${API_HOST}/admin/me/${id}`, {
      headers: { authorization: token },
    });
    const { data } = res;
    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'getAdmin',
    });
    return data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'getAdmin',
      error: 'Getting the admin account failed.',
    });
  }
};

export const editAdminAccount = (id, values) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'editAdminAccount' });
  try {
    await axios.patch(`${API_HOST}/admin/edit/${id}`, { values });
    return dispatch({
      type: types.HTTP_SUCCESS,
      api: 'editAdminAccount',
    });
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'editAdminAccount',
      error: 'Updating the admin account failed.',
    });
  }
};

/* --- Users --- */
// get users account
export const getUsers = () => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getUsers' });
  try {
    const res = await axios.get(`${API_HOST}/admin/users`);
    const { data } = res;
    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'getUsers',
    });
    return data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'getUsers',
      error: 'Getting users list is failed',
    });
  }
};

// user account
export const createUser = userInfo => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'createUser' });
  try {
    await axios.post(`${API_HOST}/admin/user/register`, { userInfo });
    return dispatch({ type: types.HTTP_SUCCESS, api: 'createUser' });
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'createUser',
      error: 'Creating a user failed.',
    });
  }
};

export const editUser = userInfo => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'editUser' });
  try {
    await axios.patch(`${API_HOST}/admin/user/edit/${userInfo.id}`, {
      userInfo,
    });
    return dispatch({ type: types.HTTP_SUCCESS, api: 'editUser' });
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'editUser',
      error: 'Editing a user failed.',
    });
  }
};

export const deleteUser = userId => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'deleteUser' });
  try {
    await axios.delete(`${API_HOST}/admin/user/delete/${userId}`);
    return dispatch({ type: types.HTTP_SUCCESS, api: 'deleteUser' });
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'deleteUser',
      error: 'Deleting the user failed.',
    });
  }
};
