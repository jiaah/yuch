import axios from 'axios';
import * as types from './actionTypes';
import { API_HOST } from '../../config';

export const createUser = userInfo => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'createUser' });
  try {
    const res = await axios.post(`${API_HOST}/auth/register`, { userInfo });
    const companyName = res.data;
    dispatch({ type: types.HTTP_SUCCESS, api: 'createUser' });
    return companyName;
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'createUser', error });
    throw new Error(error);
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
  }
};

export const userLogout = () => ({
  type: types.USER_LOGOUT,
});
