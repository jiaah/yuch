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
    const data = res.data;
    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'getAdmin',
      payload: { data },
    });
    return data;
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'getAdmin', error });
    throw new Error('Getting the admin account failed.');
  }
};

export const editAdminAccount = (id, values) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'editAdminAccount' });
  try {
    await axios.patch(
      `${API_HOST}/admin/edit/${id}`,
      { values },
      {
        headers: { authorization: token },
      },
    );
    return dispatch({
      type: types.HTTP_SUCCESS,
      api: 'editAdminAccount',
    });
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'editAdminAccount', error });
    throw new Error('Updating the admin account failed.');
  }
};

/* --- Users --- */
// get users account
export const getUsers = () => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getUsers' });
  try {
    const res = await axios.get(`${API_HOST}/admin/users`, {
      headers: { authorization: token },
    });
    const users = res.data;
    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'getUsers',
      payload: { users },
    });
    return users;
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'getUsers', error });
    throw new Error('Getting users list is failed');
  }
};

// get users catering meal prices
export const getCateringRates = () => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getCateringRates' });
  try {
    const res = await axios.get(`${API_HOST}/admin/users/catering/rates`, {
      headers: { authorization: token },
    });
    const rates = res.data;
    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'getCateringRates',
      payload: { rates },
    });
    return rates;
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'getCateringRates', error });
    throw new Error('Getting users list is failed');
  }
};

// user account
export const createUser = userInfo => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'createUser' });
  try {
    await axios.post(
      `${API_HOST}/admin/user/register`,
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
      `${API_HOST}/admin/user/edit/${userInfo.id}`,
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

export const deleteUser = userId => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'deleteUser' });
  try {
    await axios.delete(`${API_HOST}/admin/user/delete/${userId}`, {
      headers: { authorization: token },
    });
    return dispatch({ type: types.HTTP_SUCCESS, api: 'deleteUser' });
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'deleteUser', error });
    throw new Error('Deleting the user failed.');
  }
};

// user's current password is not required.
export const changePasswordByAdmin = (id, newPassword) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'password' });
  try {
    await axios.patch(
      `${API_HOST}/admin/user/password`,
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
