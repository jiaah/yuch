import axios from 'axios';
import * as types from './actionTypes';
import { API_HOST } from '../../config';

export const createUser = userInfo => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST });
  try {
    const res = await axios.post(`${API_HOST}/auth/register`, { userInfo });
    const companyName = res.data;
    dispatch({ type: types.HTTP_SUCCESS });
    return companyName;
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, error });
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
    dispatch({ type: types.HTTP_SUCCESS, api: 'login' });
    return userData;
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'login', error });
  }
};
