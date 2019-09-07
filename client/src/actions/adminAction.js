import { Axios } from './axios';
import * as types from './actionTypes';

/* --- Admin --- */
// admin account
export const getAdmin = id => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getAdmin' });
  try {
    const res = await Axios.get(`/admin/me/${id}`);
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
      status: error.response.status,
      error: 'Getting the admin account failed.',
    });
  }
};

export const editAdminAccount = (id, values) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'editAdminAccount' });
  try {
    await Axios.patch(`/admin/edit/${id}`, { values });
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
    const res = await Axios.get('/admin/users');
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
    await Axios.post('/admin/user/register', { userInfo });
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
    await Axios.patch(`/admin/user/edit/${userInfo.id}`, {
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
    await Axios.delete(`/admin/user/delete/${userId}`);
    return dispatch({ type: types.HTTP_SUCCESS, api: 'deleteUser' });
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'deleteUser',
      error: 'Deleting the user failed.',
    });
  }
};
