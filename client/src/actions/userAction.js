import axios from 'axios';
import * as types from './actionTypes';
import { API_HOST } from '../../config';
import { getToken } from '../../localStorage';

const token = getToken();

export const getUsers = () => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getUsers' });
  try {
    const res = await axios.get(`${API_HOST}/user/users`, {
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

export const getMe = id => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getMyAccount' });
  try {
    const res = await axios.get(`${API_HOST}/user/me/${id}`, {
      headers: { authorization: token },
    });
    const data = res.data;
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

export const getAdmin = id => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getAdmin' });
  try {
    const res = await axios.get(`${API_HOST}/user/admin/me/${id}`, {
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
