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
    const res = await Axios.patch(`/admin/edit/${id}`, { values });
    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'editAdminAccount',
    });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'editAdminAccount',
      status: error.response.status,
      error: 'Updating the admin account failed.',
    });
  }
};

/* --- Users --- */
// get users business numbers
export const getUsersBusinessNo = () => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getUsersBusinessNo' });
  try {
    const res = await Axios.get('/admin/users/business');
    const { data } = res;
    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'getUsersBusinessNo',
    });
    return data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'getUsersBusinessNo',
      status: error.response.status,
      error: 'Getting Users Business Number is failed',
    });
  }
};

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
      status: error.response.status,
      error: 'Getting users list is failed',
    });
  }
};

// user account
export const createUser = userInfo => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'createUser' });
  try {
    const res = await Axios.post('/admin/user/register', { userInfo });
    dispatch({ type: types.HTTP_SUCCESS, api: 'createUser' });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'createUser',
      status: error.response.status,
      error: 'Creating a user failed.',
    });
  }
};

export const editUser = userInfo => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'editUser' });
  try {
    const res = await Axios.patch(`/admin/user/edit/${userInfo.id}`, {
      userInfo,
    });
    dispatch({ type: types.HTTP_SUCCESS, api: 'editUser' });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'editUser',
      status: error.response.status,
      error: 'Editing a user failed.',
    });
  }
};

export const deleteUser = userId => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'deleteUser' });
  try {
    const res = await Axios.delete(`/admin/user/delete/${userId}`);
    dispatch({ type: types.HTTP_SUCCESS, api: 'deleteUser' });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'deleteUser',
      status: error.response.status,
      error: 'Deleting the user failed.',
    });
  }
};

export const handleEndingService = (
  userId,
  endService,
  date,
) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'endService' });
  try {
    const res = await Axios.patch(`/catering/endofservice/user/${userId}`, {
      endService,
      date,
    });
    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'endService',
    });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'endService',
      status: error.response.status,
      error: 'Updating ending service failed.',
    });
  }
};

export const getUserRates = id => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getUserRates' });
  try {
    const res = await Axios.get(`/admin/mealPrices/${id}`);
    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'getUserRates',
    });
    return res.data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'getUserRates',
      status: error.response.status,
      error: 'Getting UserRates failed.',
    });
  }
};
