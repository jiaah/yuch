import axios from 'axios';
import * as types from './actionTypes';
import { API_HOST } from '../../config';

/* --- Admin & Users --- */
export const changePassword = (id, password, newPassword) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'password' });
  try {
    await axios.patch(`${API_HOST}/user/password`, {
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

/* --- Users --- */
// user account
export const getMe = id => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getMyAccount' });
  try {
    const res = await axios.get(`${API_HOST}/user/me/${id}`);
    const { data } = res;
    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'getMyAccount',
      payload: { data },
    });
    return data;
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'getMyAccount', error });
    throw new Error('Getting the user account failed.');
  }
};

export const editUserAccount = (id, userInfo) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'editUserAccount' });
  try {
    await axios.patch(`${API_HOST}/user/edit/${id}`, { userInfo });
    return dispatch({
      type: types.HTTP_SUCCESS,
      api: 'editUserAccount',
    });
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'editUserAccount', error });
    throw new Error('Updating the user account failed.');
  }
};
